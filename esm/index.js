import WeakMap from '@ungap/weakmap';
import hyphenized from 'hyphenizer';
import {transform} from 'lighterhtml';

import {augmented, render, secret, html, svg} from './augmented.js';
import {registry, replace, regExp, selector} from './utils.js';
import extend from './extend.js';

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

const info = (tagName, is) => ({tagName, is, element: tagName === 'element'});

const define = ($, definition) => {

  const {
    Class,
    is, name, tagName
  } = typeof $ === 'string' ?
        register($, definition, '') :
        register($.name, $, '');

  registry.map[name] = setupIncludes(Class, tagName, is);
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
      (oc.get(definition) || fromObject(definition, is)) :
      (cc.get(definition) || fromClass(definition, is)),
    true
  );

  const args = [is, Class];
  const element = tagName === 'element';
  if (!element)
    args.push({extends: tagName});
  customElements.define(...args);

  defineProperty(Class, 'new', {
    value: () => element ?
                  document.createElement(is) :
                  document.createElement(tagName, {is})
  });

  if (!element)
    defineProperty(Class.prototype, 'is', {value: is});

  return {Class, is, name, tagName};
};

let index = 0;
const setupIncludes = (Class, tagName, is) => {
  const details = info(tagName, is);
  const styles = [selector(details)];
  const includes = Class.includes || Class.contains;
  if (includes) {
    const uid = '-' + ++index;
    const map = {};
    keys(includes).forEach($ => {
      const {Class, is, name, tagName} = register($, includes[$], uid);
      styles.push(selector(map[name] = setupIncludes(Class, tagName, is)));
    });
    const re = regExp(keys(map));
    defineProperty(Class, secret, {value: {map, re}});
  }
  if ('style' in Class)
    injectStyle(Class.style(...styles));
  return details;
};

transform(markup => replace(markup, registry));

export {
  define, ref,
  render, html, svg
};
