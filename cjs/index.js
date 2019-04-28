'use strict';
const {html, render, svg, transform} = require('lighterhtml');

const map = {};
const wrap = (self, type) => (...args) => render(self, () => type(...args));
let re = null;

exports.html = html;
exports.render = render;
exports.svg = svg;
const define = Class => {
  const {name, tagName} = Class;
  if (!name)
    throw `Undefined class name`;
  if (!tagName)
    throw `Undefined ${name} static tagName`;

  const is = name.toLowerCase() + '-heresy';
  customElements.define(is, Class, {extends: tagName});
  map[name] = {tagName, is};

  if (!re)
    transform(markup => markup.replace(re, (_, close, name, after) => {
      const {tagName, is} = map[name];
      return close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`;
    }));
  const heresy = Object.keys(map).join('|');
  re = new RegExp(`<(/)?(${heresy})([ \\f\\n\\r\\t>])`, 'g');

  Object.defineProperties(
    Class.prototype,
    {
      html: { get() { return wrap(this, html); } },
      svg: { get() { return wrap(this, svg); } }
    }
  );
};
exports.define = define;
