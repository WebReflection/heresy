import Hide from './hide.js';
import Item from './item.js';

const {define, html} = heresy;

// local definition, both Hide and Item can be used as name elsewhere
const {local} = define;
local('Hide:label', Hide);
local('Item:li', Item);

const _items = new WeakMap;

class Todo extends HTMLDivElement {

  static style(selector) {
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
  }

  get items() { return _items.get(this) || []; }
  set items(items) {
    _items.set(this, items);
    this.render();
  }

  render() {
    this.html`
    <input placeholder="type item" onkeydown=${this}>
    <Hide onchange=${this}/>
    <ul>${this.items.map(data => html`<Item data=${data}/>`)}</ul>`;
  }

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
          const query = `[is^=item-]:nth-child(${i + 1})`;
          const item = this.querySelector(query);
          item.scrollIntoView();
          item.flush();
        }
        else {
          this.children[1].flush();
        }
      }
    }
  }

  onchange(event) {
    this.classList.toggle('todo-only', event.target.checked);
  }
}

export default Todo;
