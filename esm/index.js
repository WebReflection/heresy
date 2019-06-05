import hyphenized from 'hyphenizer';
import {transform} from 'lighterhtml';

import {augmented, render, html, svg} from './augmented.js';

const {defineProperties} = Object;
const map = {};
let re = null;

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

let i = 0;
const get = () => {
  const uid = i ? ('-' + i) : '';
  i++;
  return ($, Class) => {
    if (typeof $ === 'function') {
      Class = $;
      $ = Class.name + ':' + Class.tagName;
    }

    if (!/^([A-Z][A-Za-z0-9_]*):([A-Za-z0-9-]+)$/.test($))
      throw `Unable to retrieve name and tagName`;

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

    if (!re)
      transform(markup => markup.replace(re, (_, close, name, after) => {
        const {tagName, is} = map[name];
        return close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`;
      }));

    const heresy = Object.keys(map).join('|');
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
