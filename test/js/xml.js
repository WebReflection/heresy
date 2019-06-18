
const {define, render, html} = heresy;

define('Circle<div>', {
  style: comp => `
    ${comp} {
      width: 300px;
      height: 200px;
    }`
  ,
  render() {
    this.html`<svg><circle cx="150" cy="100" r="50" fill="#ff0000"/></svg>`;
  }
});

render(document.body, html`<Circle />`);

// document.body.innerHTML
// <h1 is="welcome-heresy">Hello <u>...</u></h1>
