const {define, render, html} = heresy;

import First from './first.js';
import Second from './second.js';
import Third from './third.js';

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

define('ElementExample', {
  style(Comp, First, Third) {
    console.log([Comp, First, Third].join(', '));
  },
  extends: 'element',
  includes: {First, Third},
  render() {
    this.html`<First/><Third/>`;
  }
});

// either
render(document.body, html`<Div/><ElementExample/>`);

// or document.body.append(Div.new(), ElementExample.new());
