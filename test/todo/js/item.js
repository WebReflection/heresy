const _data = new WeakMap;

class Item extends HTMLLIElement {

  static style(selector) {
    return `
    ${selector} {
      list-style: none;
      background-color: white;
      transition: background 200ms ease-out;
    }
    ${selector}.flush {
      background-color: lightgreen;
    }
    ${selector} > label > input:checked + span {
      text-decoration: line-through;
      opacity: .5;
    }
    ${selector} > label {
      display: block;
      cursor: pointer;
    }`;
  }

  get data() { return _data.get(this); }
  set data(data) {
    _data.set(this, data);
    this.render();
  }

  render() {
    const {checked, text} = this.data;
    this.html`
    <label>
      <input type=checkbox checked=${checked} onchange=${this}>
      <span>${text}</span>
    </label>`;
  }

  flush() {
    this.addEventListener('transitionend', this);
    this.classList.add('flush');
  }

  onchange() {
    const {data} = this;
    data.checked = !data.checked;
    this.classList.toggle('checked', data.checked);
  }

  ontransitionend() {
    this.classList.remove('flush');
  }
}

export default Item;
