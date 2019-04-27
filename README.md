# heresy

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate) ![WebReflection status](https://offline.report/status/webreflection.svg) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

React like Custom Elements via V1 API builtin extends.

```js
import {define, html, render} from 'heresy';

class MyButton extends HTMLButtonElement {

  // the only mandatory static field
  static get tagName() { return 'button'; }

  // (optional )intercepts some attribute (any value)
  set props(props) { this._props = props; }
  get props() { return this._props; }

  // (optional) render once connected
  connectedCallback() { this.render(); }

  // (optional) populate this button content
  //            useless with void elements (i.e. input, img, ...)
  render() {
    // this.html or this.svg are provided automatically
    this.html`Click ${this.props.name}`;
  }
}

// define the custom element (class name mandatory too)
define(MyButton);

// populate some node
render(document.body, () => html`<MyButton props=${{name: 'Magic'}} />`);
console.log(document.body.innerHTML);
```

## Compatibility

Every browser, but some might need transpiled code or some polyfill upfront.

### How to include Custom Elements V1 with builtin for every browser

Simply place a couple of script tags on the top of your page.
```html
<script>/* includes DRE only in old browsers */
this.customElements||
document.write('<script src="https://unpkg.com/document-register-element"><\x2fscript>')
</script>
<script src="https://unpkg.com/@ungap/custom-elements-builtin">
/* this is just 1K fix in case you target Safari/WebKit too */
</script>
```

