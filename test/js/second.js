import P from './p.js';

export default {
  extends: 'div',
  includes: {P},
  render() {
    this.html`<P>second</P>`;
  }
};
