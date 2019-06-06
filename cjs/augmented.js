'use strict';
const Event = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/event'));
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakset'));
const tl = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/template-literal'));

const {
  Hole,
  render: lighterRender,
  html: lighterHTML,
  svg: lighterSVG
} = require('lighterhtml');

const {replace} = require('./registry.js');

const secret = '__heresy__';
exports.secret = secret;

const {defineProperties, freeze} = Object;

const $html = new WeakMap;
const $svg = new WeakMap;
const $template = new WeakMap;
const configurable = true;

const attributeChangedCallback = 'attributeChangedCallback';
const connectedCallback = 'connectedCallback';
const disconnectedCallback = `dis${connectedCallback}`;

const ws = new WeakSet;

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

  if (!('is' in prototype))
    properties.is = {
      configurable,
      get: getIsAttribute
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

const html = (...args) => new Hole('html', args);
html.for = lighterHTML.for;

const svg = (...args) => new Hole('svg', args);
svg.for = lighterSVG.for;

const render = (where, what) => lighterRender(
  where,
  typeof what === 'function' ? what : () => what
);

const setParsed = (template, info) => {
  if (info) {
    const value = replace(template.join(secret), info).split(secret);
    $template.set(template, value);
    defineProperties(value, {raw: {value}});
    return freeze(value);
  }
  return template;
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

exports.augmented = augmented;
exports.render = render;
exports.html = html;
exports.svg = svg;

function addListener(type) {
  this.addEventListener(type, this);
}

function getHTML() {
  return $html.get(this) || setWrap(this, html, $html);
}

function getSVG() {
  return $svg.get(this) || setWrap(this, svg, $svg);
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
    this[secret].forEach(addListener, this);
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
