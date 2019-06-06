import First from './first.js';
import Second from './second.js';

const {define, render, html} = heresy;

const {local} = define;
local('First', First);
local('Second', Second);
local('Div', {
  extends: 'div',
  render() {
    this.html`<First/><Second/>`;
  }
});

render(document.body, html`<Div/>`);
