import './item.js';

const {html} = heresy;

const data2Item = data => html.for(data)`<Item data=${data}/>`;

class Todo extends HTMLDivElement {
  static tagName = 'div';

  #items = [];
  get items() { return this.#items; }
  set items(items) {
    this.#items = items;
    this.render();
  }

  render() {
    this.html`
    <input placeholder="type item" onkeydown=${this}>
    <ul>${this.items.map(data2Item)}</ul>`;
  }

  onkeydown(event) {
    if (event.key !== 'Enter')
      return;
    event.preventDefault();
    const {currentTarget} = event;
    const text = currentTarget.value.trim();
    if (text) {
      const i = this.items.findIndex(item => item.text === text);
      if (i < 0) {
        this.items = this.items.concat({text, checked: false});
        currentTarget.value = '';
      }
      else {
        const item = data2Item(this.items[i]);
        setTimeout(() => item.flush(), 300);
        this.scrollTo(item);
      }
    }
  }
}

export default heresy.define(Todo);
