'use strict';
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const hyphenized = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyphenizer'));
const {transform} = require('lighterhtml');

const {augmented, render, secret, html, svg} = require('./augmented.js');
const {registry, replace, regExp} = require('./registry.js');
const extend = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./extend.js'));

const {
  create,
  defineProperty,
  defineProperties,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  getOwnPropertyDescriptor,
  keys
} = Object;

const HTML = {element: HTMLElement};
const cc = new WeakMap;
const oc = new WeakMap;

const define = ($, definition) => {

  const {
    Class,
    is, name, tagName
  } = typeof $ === 'string' ?
        register($, definition, '') :
        register(definition.name, definition, '');

  setupIncludes(Class);

  registry.map[name] = {tagName, is};
  registry.re = regExp(keys(registry.map));

  return Class;
};

const fromClass = constructor => {
  const Class = extend(constructor, false);
  augmented(Class.prototype);
  cc.set(constructor, Class);
  return Class;
};

const fromObject = object => {
  const {statics, prototype, tag} = grabInfo(object);
  const Class = extend(
    HTML[tag] || (HTML[tag] = document.createElement(tag).constructor),
    false
  );
  augmented(defineProperties(Class.prototype, prototype));
  oc.set(object, defineProperties(Class, statics));
  return Class;
};

const getTag = Class => Class.tagName || Class.extends;

const grabInfo = object => {
  const statics = create(null);
  const prototype = create(null);
  const info = {
    statics,
    prototype,
    tag: getTag(object)
  };
  getOwnPropertyNames(object).concat(
    getOwnPropertySymbols(object)
  ).forEach(name => {
    const descriptor = getOwnPropertyDescriptor(object, name);
    descriptor.enumerable = false;
    switch (name) {
      case 'extends':
        name = 'tagName';
      case 'contains':
      case 'includes':
      case 'name':
      case 'observedAttributes':
      case 'style':
      case 'tagName':
        statics[name] = descriptor;
        break;
      default:
        prototype[name] = descriptor;
    }
  });
  return info;
};

const injectStyle = cssText => {
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet)
    style.styleSheet.cssText = cssText;
  else
    style.appendChild(document.createTextNode(cssText));
  const head = document.head || document.querySelector('head');
  head.insertBefore(style, head.lastChild);
};

const ref = (self, name) => self ?
  (self[name] || (self[name] = {current: null})) :
  {current: null};

const register = ($, definition, uid) => {

  if ($.indexOf(':') < 0)
    $ += ':' + getTag(definition);

  if (!/^([A-Z][A-Za-z0-9_]*):([A-Za-z0-9-]+)$/.test($))
    throw `Invalid name or tagName`;

  const {$1: name, $2: tagName} = RegExp;
  const is = hyphenized(name) + uid + '-heresy';

  if (customElements.get(is))
    throw `Duplicated ${is} definition`;

  const Class = extend(
    typeof definition === 'object' ?
      (oc.get(definition) || fromObject(definition)) :
      (cc.get(definition) || fromClass(definition)),
    true
  );

  customElements.define(is, Class, {extends: tagName});

  defineProperty(Class, 'new', {
    value: () => document.createElement(tagName, {is})
  });

  if ('style' in Class)
    injectStyle(Class.style(`${tagName}[is="${is}"]`));

  return {Class, is, name, tagName};
};

let index = 0;
const setupIncludes = (Class) => {
  const includes = Class.includes || Class.contains;
  if (includes) {
    const uid = '-' + ++index;
    const map = {};
    keys(includes).forEach($ => {
      const {Class, is, name, tagName} = register($, includes[$], uid);
      map[name] = {tagName, is};
      setupIncludes(Class);
    });
    const re = regExp(keys(map));
    defineProperty(Class, secret, {value: {map, re}});
  }
};

transform(markup => replace(markup, registry));

exports.define = define;
exports.ref = ref;
exports.render = render;
exports.html = html;
exports.svg = svg;
