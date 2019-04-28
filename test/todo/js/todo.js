import './hide.js';
import './item.js';

const {define, html} = heresy;

const data2Item = data => html.for(data)`<Item data=${data}/>`;

class Todo extends HTMLDivElement {
  static tagName = 'div';
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

  #items = [];
  get items() { return this.#items; }
  set items(items) {
    this.#items = items;
    this.render();
  }

  render() {
    this.html`
    <input placeholder="type item" onkeydown=${this}>
    <Hide onchange=${this}/>
    <ul>${this.items.map(data2Item)}</ul>`;
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
        const item = data2Item(data);
        if (
          !data.checked ||
          !this.classList.contains('todo-only')
        ) {
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

export default define(Todo);
