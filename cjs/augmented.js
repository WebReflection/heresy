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

const {replace, setInfo} = require('./utils.js');

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

const augmentedRender = prototype => {
  const {render} = prototype;
  prototype.render = function () {
    const info = this.constructor[secret];
    return (
      prototype.render = info ?
        function () {
          setInfo(info);
          const out = render.apply(this, arguments);
          setInfo(null);
          return out;
        } :
        render
    ).apply(this, arguments);
  };
};

const augmented = (prototype, is) => {

  if ('render' in prototype)
    augmentedRender(prototype);

  const __heresy__ = [];
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

exports.secret = secret;
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
