import Hide from './hide.js';
import Item from './item.js';

const {define, html, ref} = heresy;

define('Hide', Hide);
define('Item', Item);

const _items = new WeakMap;

export default {

  extends: 'div',

  style(selector) {
    return `
    ${selector} > ul {
      max-height: 146px;
      overflow: auto;
      padding: 0;
    }
    ${selector} > label {
      cursor: pointer;
    }
    ${selector}.todo-only > ul > .checked {
      display: none;
    }`;
  },

  get items() { return _items.get(this) || []; },
  set items(items) {
    _items.set(this, items);
    this.render();
  },

  render() {
    this.html`
    <input placeholder="type item" onkeydown=${this}>
    <Hide ref=${ref(this, 'hide')} onchange=${this}/>
    <ul>${this.items.map(data => html`<Item data=${data}/>`)}</ul>`;
  },

  onkeydown(event) {
    if (event.key !== 'Enter')
      return;
    event.preventDefault();
    const {target} = event;
    const text = target.value.trim();
    if (text) {
      const i = this.items.findIndex(item => item.text === text);
      if (i < 0) {
        this.items = this.items.concat({text, checked: false});
        target.value = '';
      }
      else {
        const data = this.items[i];
        if (
          !data.checked ||
          !this.classList.contains('todo-only')
        ) {
          const query = `li[is^=item-]:nth-child(${i + 1})`;
          const item = this.querySelector(query);
          item.scrollIntoView();
          item.flush();
        }
        else {
          this.children[1].flush();
        }
      }
    }
  },

  onchange() {
    this.classList.toggle('todo-only', this.hide.current.checked);
  }

};
