'use strict';
const hyphenized = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyphenizer'));
const {
  Hole, transform, render: lighterRender, html: lighterHTML, svg: lighterSVG
} = require('lighterhtml');

const {defineProperties} = Object;
const map = {};
const wrap = (self, type) => (...args) => render(self, () => type(...args));
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

const ref = (self, name) => self ?
  (self[name] || (self[name] = {current: null})) :
  {current: null};
exports.ref = ref;

const render = (where, what) => lighterRender(
  where,
  typeof what === 'function' ? what : () => what
);
exports.render = render;

const html = (...args) => new Hole('html', args);
exports.html = html;
const svg = (...args) => new Hole('svg', args);
exports.svg = svg;

html.for = lighterHTML.for;
svg.for = lighterSVG.for;

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
  
    const {prototype, style} = Class;
    const configurable = true;
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

    if ('render' in prototype && !('connectedCallback' in prototype))
      properties.connectedCallback = {
        configurable,
        value: connectedCallback
      };

    if (!('handleEvent' in prototype))
      properties.handleEvent = {
        configurable,
        value: handleEvent
      };

    defineProperties(prototype, properties);

    const is = hyphenized(name) + uid + '-heresy';
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
exports.define = define;

function connectedCallback() {
  this.render();
}

function getHTML() {
  return wrap(this, lighterHTML);
}

function getSVG() {
  return wrap(this, lighterSVG);
}

function handleEvent(event) {
  this[`on${event.type}`](event);
}
