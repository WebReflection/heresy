export default heresy.define(
  class Hide extends HTMLLabelElement {
    static tagName = 'label';
    static style(selector) {
      return `
      ${selector} {
        background-color: white;
        transition: background 200ms ease-out;
      }
      ${selector}.flush {
        background-color: lightgreen;
      }`;
    }

    render() {
      this.html`<input type="checkbox"> hide done`;
    }

    flush() {
      this.addEventListener('transitionend', this);
      this.classList.add('flush');
    }

    ontransitionend() {
      this.classList.remove('flush');
    }
  }
);
