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

import {replace} from './utils.js';

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

  const __heresy__ = [];
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

  properties[secret] = {value: __heresy__};

  if (!('handleEvent' in prototype))
    properties.handleEvent = {
      configurable,
      value: handleEvent
    };

  // setup the init dispatch only if needed
  // ensure render with an init is triggered after
  if ('oninit' in prototype) {
    __heresy__.push('init');
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
        __heresy__.push(he.slice(2));
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

const setParsed = (template, info) => {
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
                setParsed(template, self.constructor[secret]);
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
    this[secret].forEach(addListener, this);
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
