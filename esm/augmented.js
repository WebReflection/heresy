import Event from '@ungap/event';
import WeakMap from '@ungap/weakmap';
import WeakSet from '@ungap/weakset';
import tl from '@ungap/template-literal';

import {
  Hole,
  render as lighterRender,
  html as lighterHTML,
  svg as lighterSVG
} from 'lighterhtml';

import {replace, setInfo} from './utils.js';

const secret = '_\uD83D\uDD25';

const {defineProperties} = Object;

const $html = new WeakMap;
const $svg = new WeakMap;
const $template = new WeakMap;
const ws = new WeakSet;

const configurable = true;

const attributeChangedCallback = 'attributeChangedCallback';
const connectedCallback = 'connectedCallback';
const disconnectedCallback = `dis${connectedCallback}`;

const addInit = (prototype, properties, method) => {
  if (method in prototype) {
    const original = prototype[method];
    properties[method] = {
      configurable,
      value() {
        init.call(this);
        return original.apply(this, arguments);
      }
    };
  }
  else
    properties[method] = {
      configurable,
      value: init
    };
};

// TODO:  this could be probably moved when/if
//        the secret in the prototype is changed
//        without needing a one off runtime check at distance
const augmentedRender = prototype => {
  const {render} = prototype;
  let patched = render;
  let init = true;
  prototype.render = function () {
    if (init) {
      init = false;
      const {info} = this[secret];
      if (info) {
        patched = function () {
          setInfo(info);
          const out = render.apply(this, arguments);
          setInfo(null);
          return out;
        };
      }
    }
    return patched.apply(this, arguments);
  };
};

const augmented = (prototype, is) => {

  if ('render' in prototype)
    augmentedRender(prototype);

  const events = [];
  const properties = {
    is: {value: is},
    html: {
      configurable,
      get: getHTML
    },
    svg: {
      configurable,
      get: getSVG
    }
  };

  properties[secret] = {
    value: {
      events,
      info: null
    }
  };

  if (!('handleEvent' in prototype))
    properties.handleEvent = {
      configurable,
      value: handleEvent
    };

  // setup the init dispatch only if needed
  // ensure render with an init is triggered after
  if ('oninit' in prototype) {
    events.push('init');
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
      if (he !== 'render')
        events.push(he.slice(2));
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

  defineProperties(prototype, properties);
};

const evt = type => new Event(type);

const html = (...args) => new Hole('html', args);
html.for = lighterHTML.for;

const svg = (...args) => new Hole('svg', args);
svg.for = lighterSVG.for;

const render = (where, what) => lighterRender(
  where,
  typeof what === 'function' ? what : () => what
);

const setParsed = (template, {info}) => {
  const value = (
    info ?
      replace(template.join(secret), info).split(secret) :
      template
  );
  $template.set(template, value);
  return value;
};

const setWrap = (self, type, wm) => {
  const fn = wrap(self, type);
  wm.set(self, fn);
  return fn;
};

const wrap = (self, type) => (tpl, ...values) => {
  const template = tl(tpl);
  const local = $template.get(template) ||
                setParsed(template, self[secret]);
  return lighterRender(self, () => type(local, ...values));
};

export {
  secret,
  augmented,
  render, html, svg
};

function addListener(type) {
  this.addEventListener(type, this);
}

function getHTML() {
  return $html.get(this) || setWrap(this, html, $html);
}

function getSVG() {
  return $svg.get(this) || setWrap(this, svg, $svg);
}

function handleEvent(event) {
  this[`on${event.type}`](event);
}

function init() {
  if (!ws.has(this)) {
    ws.add(this);
    this[secret].events.forEach(addListener, this);
    this.dispatchEvent(evt('init'));
  }
}

function onattributechanged(attributeName, oldValue, newValue) {
  const event = evt('attributechanged');
  event.attributeName = attributeName;
  event.oldValue = oldValue;
  event.newValue = newValue;
  this.dispatchEvent(event);
}

function onconnected() {
  this.dispatchEvent(evt('connected'));
}

function onconnectedrender() {
  this.render();
}

function ondisconnected() {
  this.dispatchEvent(evt('disconnected'));
}
