const {define, render, html} = heresy;

import First from './first.js';
import Second from './second.js';

const Div = define('Div', {
  extends: 'div',
  includes: {First, Second},
  render() {
    this.html`<First/><Second/>`;
  }
});

// either
render(document.body, html`<Div/>`);

// or document.body.appendChild(Div.new());
