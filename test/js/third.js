import P from './p.js';

export default {
  // should receive style for P too
  style(...args) {
    console.log(args.join(', '));
  },
  extends: 'div',
  includes: {P},
  render() {
    this.html`<P>third</P>`;
  }
};
