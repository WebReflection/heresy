const {define, render, html} = heresy;

import First from './first.js';
import Second from './second.js';

const Div = define('Div', {
  // should receive style for First and Second too
  style(Div, First, Second) {
    // since outer component style is injected after
    // it is possible to eventually overwrite nested
    // components through higher priority / specificity
    console.log([Div, First, Second].join(', '));
  },
  extends: 'div',
  includes: {First, Second},
  render() {
    this.html`<First/><Second/>`;
  }
});

// either
render(document.body, html`<Div/>`);

// or document.body.appendChild(Div.new());
