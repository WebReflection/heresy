'use strict';
const {html, render, svg, transform} = require('lighterhtml');

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

  // all good here: setup transformer
  const re = new RegExp(`<(/)?${name}(\\s|>)`, 'g');
  const place = `<$1${tagName} is="${is}"$2`;
  const wrap = (self, type) => (...args) => render(self, () => type(...args));
  transform(markup => markup.replace(re, place));
  Object.defineProperties(
    Class.prototype,
    {
      html: {
        get() {
          return wrap(this, html);
        }
      },
      svg: {
        get() {
          return wrap(this, svg);
        }
      }
    }
  );
};
exports.define = define;
