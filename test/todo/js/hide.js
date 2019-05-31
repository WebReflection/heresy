export default heresy.define(
  'Hide:label',
  class extends HTMLLabelElement {

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

    flush() {
      this.addEventListener('transitionend', this);
      this.classList.add('flush');
    }

    render() {
      this.html`<input type="checkbox"> hide done`;
    }

    ontransitionend() {
      this.classList.remove('flush');
    }

  }
);
