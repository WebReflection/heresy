'use strict';
const {
  Hole, render, transform, html: lighterHTML, svg: lighterSVG
} = require('lighterhtml');

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

exports.render = render;

const html = (...args) => new Hole('html', args);
exports.html = html;
const svg = (...args) => new Hole('svg', args);
exports.svg = svg;

html.for = lighterHTML.for;
svg.for = lighterSVG.for;

const define = Class => {
  const {name, tagName, style} = Class;
  if (!name)
    throw `Undefined class name`;
  if (!tagName)
    throw `Undefined ${name} static tagName`;

  const {prototype} = Class;
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

  Object.defineProperties(prototype, properties);

  const is = name.toLowerCase() + '-heresy';
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
  re = new RegExp(`<(/)?(${heresy})([ \\f\\n\\r\\t>])`, 'g');

  return Class;
};
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
