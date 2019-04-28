import {html, render, svg, transform} from 'lighterhtml';

const map = {};
const wrap = (self, type) => (...args) => render(self, () => type(...args));
let re = null;

export {html, render, svg};
export const define = Class => {
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

  const proto = Class.prototype;
  const properties = {
    html: { get() { return wrap(this, html); } },
    svg: { get() { return wrap(this, svg); } }
  };

  if ('render' in proto && !('connectedCallback' in proto))
    properties.connectedCallback = {value: connectedCallback};

  if (!('handleEvent' in proto))
    properties.handleEvent = {value: handleEvent};

  Object.defineProperties(proto, properties);
  return Class;
};

function connectedCallback() {
  this.render();
}

function handleEvent() {
  this[`on${event.type}`](event);
}
