'use strict';
const Event = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/event'));
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const WeakSet = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakset'));
const tl = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/template-literal'));

const {Hole, custom} = require('lighterhtml');

const {
  augmentor,
  useCallback,
  useContext,
  useEffect,
  dropEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} = require('augmentor');

const {registry, replace} = require('./utils.js');

const hooks = {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
};

const {
  render: lighterRender,
  html: lighterHTML,
  svg: lighterSVG
} = custom({
  transform: () => markup => replace(markup, registry)
});

const secret = '_\uD83D\uDD25';

const {defineProperties} = Object;

const $html = new WeakMap;
const $svg = new WeakMap;
const $mappedAttributes = new WeakMap;
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

const augmented = Class => {

  const {prototype} = Class;

  const events = [];
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

  if ('render' in prototype && prototype.render.length) {
    const {oninit} = prototype;
    defineProperties(prototype, {
      oninit: {
        configurable,
        value() {
          const hook = augmentor(this.render.bind(this, hooks));
          defineProperties(this, 'render', {
            configurable,
            value: hook
          });
          this.addEventListener(
            'disconnected',
            dropEffect.bind(null, hook),
            false
          );
          if (oninit)
            oninit.apply(this, arguments);
        }
      }
    });
  }

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

  const booleanAttributes = Class.booleanAttributes || [];
  booleanAttributes.forEach(name => {
    if (!(name in prototype))
      properties[name] = {
        configurable,
        get() { return this.hasAttribute(name); },
        set(value) {
          if (!value || value === 'false')
            this.removeAttribute(name);
          else
            this.setAttribute(name, value);
        }
      };
  });

  const observedAttributes = Class.observedAttributes || [];
  observedAttributes.forEach(name => {
    if (!(name in prototype))
      properties[name] = {
        configurable,
        get() { return this.getAttribute(name); },
        set(value) {
          if (value == null)
            this.removeAttribute(name);
          else
            this.setAttribute(name, value);
        }
      };
  });

  const mappedAttributes = Class.mappedAttributes || [];
  mappedAttributes.forEach(name => {
    const _ = new WeakMap;
    const listening = ('on' + name) in prototype;
    if (listening)
      events.push(name);
    properties[name] = {
      configurable,
      get() { return _.get(this); },
      set(detail) {
        _.set(this, detail);
        if (listening) {
          const e = evt(name);
          e.detail = detail;
          if (ws.has(this))
            this.dispatchEvent(e);
          else {
            const dispatch = $mappedAttributes.get(this);
            if (dispatch)
              dispatch.push(e);
            else
              $mappedAttributes.set(this, [e]);
          }
        }
      }
    };
  });

  defineProperties(prototype, properties);

  const attributes = booleanAttributes.concat(observedAttributes);
  return attributes.length ?
    defineProperties(Class, {
      observedAttributes: {
        configurable,
        get: () => attributes
      }
    }) :
    Class;
};

const evt = type => new Event(type);

const html = (...args) => new Hole('html', args);
html.for = lighterHTML.for;

const svg = (...args) => new Hole('svg', args);
svg.for = lighterSVG.for;

const setParsed = (wm, template, {info}) => {
  const value = (
    info ?
      replace(template.join(secret), info).split(secret) :
      template
  );
  wm.set(template, value);
  return value;
};

const setWrap = (self, type, wm) => {
  const fn = wrap(self, type, new WeakMap);
  wm.set(self, fn);
  return fn;
};

const wrap = (self, type, wm) => (tpl, ...values) => {
  const template = tl(tpl);
  const local = wm.get(template) ||
                setParsed(wm, template, self[secret]);
  return lighterRender(self, () => type(local, ...values));
};

exports.Hole = Hole;
exports.secret = secret;
exports.augmented = augmented;
exports.lighterRender = lighterRender;
exports.html = html;
exports.svg = svg;

function addListener(type) {
  this.addEventListener(type, this);
}

function dispatchEvent(event) {
  this.dispatchEvent(event);
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
    const events = $mappedAttributes.get(this);
    if (events) {
      $mappedAttributes.delete(this);
      events.forEach(dispatchEvent, this);
    }
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
