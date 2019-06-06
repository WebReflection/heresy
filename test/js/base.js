
const {define, render, html} = heresy;

define('Welcome', {
  extends: 'h1',
  style: comp => `
    ${comp} {
      font-size: 16px;
      font-family: sans-serif;
    }`
  ,
  render() {
    this.html`Hello <u>${navigator.userAgent}</u>`;
  }
});

render(document.body, html`<Welcome/>`);

// document.body.innerHTML
// <h1 is="welcome-heresy">Hello <u>...</u></h1>
