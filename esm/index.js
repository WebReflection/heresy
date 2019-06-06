import hyphenized from 'hyphenizer';
import {transform} from 'lighterhtml';

import {augmented, render, html, svg} from './augmented.js';
import extend from './extend.js';

const {
  defineProperty,
  defineProperties,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  getOwnPropertyDescriptor,
  keys
} = Object;

const HTML = {element: HTMLElement};
const map = {};
let re = null;
let init = true;

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

const fromObject = object => {
  const tag = getTag(object);
  const Class = extend(HTML[tag] || (
    HTML[tag] = document.createElement(tag).constructor
  ));
  getOwnPropertyNames(object).concat(
    getOwnPropertySymbols(object)
  ).forEach(name => {
    const descriptor = getOwnPropertyDescriptor(object, name);
    descriptor.enumerable = false;
    switch (name) {
      case 'extends':
          name = 'tagName';
      case 'name':
      case 'observedAttributes':
      case 'style':
      case 'tagName':
        defineProperty(Class, name, descriptor);
        break;
      default:
        defineProperty(Class.prototype, name, descriptor);
    }
  });
  return Class;
};

const getTag = Class => Class.tagName || Class.extends;

let i = 0;
const get = () => {
  const uid = i ? ('-' + i) : '';
  i++;
  return ($, Class) => {

    if (typeof $ !== 'string') {
      Class = $;
      $ = Class.name;
    }

    if ($.indexOf(':') < 0)
      $ += ':' + getTag(Class);

    if (typeof Class === 'object')
      Class = fromObject(Class);

    if (!/^([A-Z][A-Za-z0-9_]*):([A-Za-z0-9-]+)$/.test($))
      throw `Invalid name or tagName`;

    const {$1: name, $2: tagName} = RegExp;
    const is = hyphenized(name) + uid + '-heresy';

    if (customElements.get(is))
      throw `Duplicated ${is} definition`;

    const {prototype, style} = Class;
    defineProperties(prototype, augmented(prototype));
    customElements.define(is, Class, {extends: tagName});
    map[name] = {tagName, is};

    if (style)
      injectStyle(style.call(Class, `${tagName}[is="${is}"]`));

    if (init) {
      init = false;
      transform(markup => markup.replace(re, (_, close, name, after) => {
        const {tagName, is} = map[name];
        return close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`;
      }));
    }

    const heresy = keys(map).join('|');
    re = new RegExp(`<(/)?(${heresy})([^A-Za-z0-9_])`, 'g');

    return Class;
  };
};

const define = defineProperties(get(), {local: {get}});
const ref = (self, name) => self ?
  (self[name] || (self[name] = {current: null})) :
  {current: null};

export {
  define, ref,
  render, html, svg
};
