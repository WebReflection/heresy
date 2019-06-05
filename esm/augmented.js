import {
  Hole,
  render as lighterRender,
  html as lighterHTML,
  svg as lighterSVG
} from 'lighterhtml';

import Event from '@ungap/event';
import WeakMap from '@ungap/weakmap';
import WeakSet from '@ungap/weakset';

const {getPrototypeOf} = Object;

const configurable = true;

const attributeChangedCallback = 'attributeChangedCallback';
const connectedCallback = 'connectedCallback';
const disconnectedCallback = `dis${connectedCallback}`;

const ws = new WeakSet;
const wm = new WeakMap;

const addInit = (prototype, properties, method) => {
  if (method in prototype) {
    const original = prototype[method];
    properties[method] = {
      configurable,
      value() {
        init.call(this);
        return original.call(this);
      }
    };
  }
  else
    properties[method] = {
      configurable,
      value: init
    };
};

const augmented = prototype => {

  wm.set(prototype, []);

  const properties = {
    html: {
      configurable,
      get: getHTML
    },
    svg: {
      configurable,
      get: getSVG
    }
  };

  if (!('handleEvent' in prototype))
    properties.handleEvent = {
      configurable,
      value: handleEvent
    };

  if (!('is' in prototype))
  properties.is = {
    configurable,
    get: getIsAttribute
  };

  // setup the init dispatch only if needed
  // ensure render with an init is triggered after
  if ('oninit' in prototype) {
    wm.get(prototype).push('init');
    addInit(prototype, properties, 'render');
  }

  // ensure all other callbacks are dispatched too
  addInit(prototype, properties, attributeChangedCallback);
  addInit(prototype, properties, connectedCallback);
  addInit(prototype, properties, disconnectedCallback);

  [
    [
      attributeChangedCallback,
      'onattributechanged',
      onattributechanged
    ],
    [
      connectedCallback,
      'onconnected',
      onconnected
    ],
    [
      disconnectedCallback,
      'ondisconnected',
      ondisconnected
    ],
    [
      connectedCallback,
      'render',
      onconnectedrender
    ]
  ].forEach(([ce, he, value]) => {
    if (!(ce in prototype) && he in prototype) {
      if (he.slice(0, 2) === 'on')
        wm.get(prototype).push(he.slice(2));
      if (ce in properties) {
        const original = properties[ce].value;
        properties[ce] = {
          configurable,
          value() {
            original.apply(this, arguments);
            return value.apply(this, arguments);
          }
        };
      }
      else
        properties[ce] = {configurable, value};
    }
  });

  return properties;
};

const html = (...args) => new Hole('html', args);
html.for = lighterHTML.for;

const svg = (...args) => new Hole('svg', args);
svg.for = lighterSVG.for;

const render = (where, what) => lighterRender(
  where,
  typeof what === 'function' ? what : () => what
);

const wrap = (self, type) => (...args) => render(self, () => type(...args));

export {
  augmented,
  render, html, svg
};

function addListener(type) {
  this.addEventListener(type, this);
}

function getHTML() {
  return wrap(this, html);
}

function getSVG() {
  return wrap(this, svg);
}

function getIsAttribute() {
  return this.getAttribute('is');
}

function handleEvent(event) {
  this[`on${event.type}`](event);
}

function init() {
  if (!ws.has(this)) {
    ws.add(this);
    wm.get(getPrototypeOf(this)).forEach(addListener, this);
    this.dispatchEvent(new Event('init'));
  }
}

function onattributechanged(attributeName, oldValue, newValue) {
  const event = new Event('attributechanged');
  event.attributeName = attributeName;
  event.oldValue = oldValue;
  event.newValue = newValue;
  this.dispatchEvent(event);
}

function onconnected() {
  this.dispatchEvent(new Event('connected'));
}

function onconnectedrender() {
  this.render();
}

function ondisconnected() {
  this.dispatchEvent(new Event('disconnected'));
}
