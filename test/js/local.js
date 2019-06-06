import First from './first.js';
import Second from './second.js';

const {define} = heresy;

const {local} = define;
local('First', First);
local('Second', Second);
const Div = define('Div', {
  extends: 'div',
  render() {
    this.html`<First/><Second/>`;
  }
});

document.body.appendChild(Div.new());
