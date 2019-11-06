const {define, render, html, useState} = heresy;

define('Welcome', {
  hooks: true,
  extends: 'element',
  style: comp => `
    ${comp} {
      font-size: 16px;
      font-family: sans-serif;
      font-weight: bold;
    }
    ${comp} > u {
      font-weight: normal;
    }`
  ,
  render() {
    const [clicks, setState] = useState(0);
    this.html`Hello <u>${navigator.userAgent}</u>
    <hr/>
    <button onclick=${() => setState(clicks + 1)}>clicks ${clicks}</button>`;
  }
});

render(document.body, html`<Welcome/>`);

// document.body.innerHTML
// <h1 is="welcome-heresy">Hello <u>...</u></h1>
