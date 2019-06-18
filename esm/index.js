import WeakMap from '@ungap/weakmap';
import hyphenized from 'hyphenizer';
import {transform} from 'lighterhtml';

import {augmented, render, secret, html, svg} from './augmented.js';
import {
  extend,
  hash,
  registry,
  replace,
  regExp,
  selector,
  getInfo, setInfo
} from './utils.js';

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

const define = ($, definition) => (
  typeof $ === 'string' ?
    register($, definition, '') :
    register($.name, $, '')
).Class;

const fromClass = constructor => {
  const Class = extend(constructor, false);
  augmented(Class.prototype);
  cc.set(constructor, Class);
  return Class;
};

const fromObject = (object, tag) => {
  const {statics, prototype} = grabInfo(object);
  const Class = extend(
    HTML[tag] || (HTML[tag] = document.createElement(tag).constructor),
    false
  );
  augmented(defineProperties(Class.prototype, prototype));
  oc.set(object, defineProperties(Class, statics));
  return Class;
};

const grabInfo = object => {
  const statics = create(null);
  const prototype = create(null);
  const info = {prototype, statics};
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
  if (cssText.length) {
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet)
      style.styleSheet.cssText = cssText;
    else
      style.appendChild(document.createTextNode(cssText));
    const head = document.head || document.querySelector('head');
    head.insertBefore(style, head.lastChild);
  }
};

const ref = (self, name) => self ?
  (self[name] || (self[name] = {current: null})) :
  {current: null};

const register = ($, definition, uid) => {

  if (!/^([A-Z][A-Za-z0-9_]*)(<([A-Za-z0-9:_-]+)>|:([A-Za-z0-9:_-]+))?$/.test($))
    throw 'Invalid name';

  const {$1: name, $3: asTag, $4: asColon} = RegExp;
  const tagName = asTag || asColon || definition.tagName || definition.extends;

  if (!/^[A-Za-z0-9:_-]+$/.test(tagName))
    throw 'Invalid tag';

  const is = hyphenized(name) + uid + '-heresy';

  if (customElements.get(is))
    throw `Duplicated ${is} definition`;

  const Class = extend(
    typeof definition === 'object' ?
      (oc.get(definition) || fromObject(definition, tagName)) :
      (cc.get(definition) || fromClass(definition)),
    true
  );

  const element = tagName === 'element';
  defineProperty(Class, 'new', {
    value: element ?
      () => document.createElement(is) :
      () => document.createElement(tagName, {is})
  });
  defineProperty(Class.prototype, 'is', {value: is});

  // for some reason the class must be fully defined upfront
  // or components upgraded from the DOM won't have all details
  if (uid === '') {
    const id = hash(is.slice(0, -7).toUpperCase());
    registry.map[name] = setupIncludes(Class, tagName, is, {id, i: 0});
    registry.re = regExp(keys(registry.map));
  }

  const args = [is, Class];
  if (!element)
    args.push({extends: tagName});
  customElements.define(...args);

  return {Class, is, name, tagName};
};

const setupIncludes = (Class, tagName, is, u) => {
  const {prototype} = Class;
  const details = info(tagName, is);
  const styles = [selector(details)];
  const includes = Class.includes || Class.contains;
  if (includes) {
    const map = {};
    keys(includes).forEach($ => {
      const uid = `-${u.id}-${u.i++}`;
      const {Class, is, name, tagName} = register($, includes[$], uid);
      styles.push(selector(map[name] = setupIncludes(Class, tagName, is, u)));
    });
    const re = regExp(keys(map));
    const {events} = prototype[secret];
    const value = {
      events,
      info: {map, re}
    };
    defineProperty(prototype, secret, {value});
    if ('render' in prototype) {
      const {render} = prototype;
      const {info} = value;
      defineProperty(prototype, 'render', {
        value() {
          const tmp = getInfo();
          setInfo(info);
          const out = render.apply(this, arguments);
          setInfo(tmp);
          return out;
        }
      });
    }
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
