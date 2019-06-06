import P from './p.js';

const {local} = heresy.define;
local('P', P);

export default {
  extends: 'div',
  render() {
    this.html`<P>second</P>`;
  }
};
