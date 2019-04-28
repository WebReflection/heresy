export default heresy.define(
  class Item extends HTMLLIElement {
    static tagName = 'li';
  
    #data = {};
    get data() { return this.#data; }
    set data(data) {
      this.#data = data;
      this.render();
    }
  
    render() {
      const {checked, text} = this.data;
      this.html`
        <input type=checkbox checked=${checked} onchange=${this}>
        ${text}
      `;
    }
  
    flush() {
      this.addEventListener('transitionend', this);
      this.classList.add('flush');
    }
  
    onchange() {
      const {data} = this;
      data.checked = !data.checked;
    }
  
    ontransitionend() {
      this.classList.remove('flush');
    }
  }
);
