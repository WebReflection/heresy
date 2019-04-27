# heresy

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate) ![WebReflection status](https://offline.report/status/webreflection.svg) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

React like Custom Elements via V1 API builtin extends.

The following example is [live in Code Pen](https://codepen.io/WebReflection/pen/WWPWdR?editors=0010).

```js
import {define, html, render} from 'heresy';

class MyButton extends HTMLButtonElement {

  // the only mandatory static field
  static get tagName() { return 'button'; }

  // (optional) intercepts some attribute (any value)
  set props(props) { this._props = props; }
  get props() { return this._props; }

  // (optional) render once connected
  connectedCallback() { this.render(); }

  // (optional) populate this button content
  //            (kinda useless with void elements such img, input, ...)
  render() {
    // this.html or this.svg are provided automatically
    this.html`Click ${this.props.name}!`;
  }
}

// define the custom element (class name mandatory too)
define(MyButton);

// populate some node
render(document.body, () => html`<MyButton props=${{name: 'Magic'}} />`);

setTimeout(() => console.log(document.body.innerHTML));
// <button is='mybutton-heresy'>Click Magic!</button>
```


## Compatibility

Every browser, but some might need some polyfill upfront (or transpiled code).


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


## Concept

Custom Elements builtin are likely the best thing we have to build components the way we want to.

Instead of using a non standard indirection as JSX is, we can use the power of [domtagger](https://github.com/WebReflection/domtagger#domtagger), the [hyperHTML](https://github.com/WebReflection/hyperHTML) and [lighterhtml](https://github.com/WebReflection/lighterhtml) tag engine, to replace once any `<DefinedElement />` with, or without nested nodes.

The Custom Elements V1 API provides enough primitives to intercepts any sort of attribute (i.e. the `props` in the example), but also react on events such `connectedCallback` or `disconnectedCallback` and `attributeChangedCallback`.

Mixed up with builtin extends in a way that any component is a real thing on the DOM, instead of a facade of itself, _herey_ makes creation of simple to complex App a no-brainer: define the content through `this.html` or `this.svg` and that's it.

When any class is defined, it's not just necessarily a useless `HTMLElement`, it can be pretty much any kind of element.

The following example is [live in Code Pen](https://codepen.io/WebReflection/pen/eoxobK?editors=0010).
```js
import {define, html, render} from 'heresy';

// a div
define(class Div extends HTMLDivElement {
  static get tagName() { return 'div'; }
})

// a paragraph
define(class P extends HTMLParagraphElement {
  static get tagName() { return 'p'; }
})

// a h1
define(class H1 extends HTMLHeadingElement {
  static get tagName() { return 'h1'; }
})

render(document.body, () => html`
  <Div>
    <H1>Hello there</H1>
    <P>This is how custom elements look via heresy.</P>
    <P>Isn't this awesome?</P>
  </Div>
`);
```


## Goals

  * declared elements are the instance you'd expect (no virtual, no facade)
  * declared elements can be of any kind (table, tr, select, option, ...)
  * any attribute change, or node lifecycle, can be tracked via Custom Elements V1 API (no componentDidMount and friends)
  * no redundant dom nodes, no ghost fragments, a clean as possible output


## CSS - How to query or style this heresy

Every builtin extend will have a `-heresy` suffix to ensure both that the Custom Element can be registered, but also grant a common pattern to reach components.

```css
*[is$='-heresy']:hover {
  opacity: .8;
}

tag[is='specific-heresy'] {
  display: block;
}
```
