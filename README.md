# 🔥 heresy 🔥

<sup>**Social Media Photo by [Robert Lukeman](https://unsplash.com/@robertlukeman) on [Unsplash](https://unsplash.com/)**</sup>

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate) ![WebReflection status](https://offline.report/status/webreflection.svg) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

React-like Custom Elements via V1 API builtin extends.

The following example is [live in Code Pen](https://codepen.io/WebReflection/pen/WWPWdR?editors=0010).

```js
import {define, html, render} from 'heresy';

class MyButton extends HTMLButtonElement {

  // (optional) static fields to define the component/class name or tag
  // use define('MyButton:button', MyButton); if you want to avoid this
  static get name() { return 'MyButton'; }
  static get tagName() { return 'button'; }

  // (optional) static callback to style components (once per definition)
  static style(selector) {
    // the component could be scoped so that
    // to be sure the selector is the right one
    // always use the received component to define its styles
    return `${selector} {
      border: 2px solid black;
    }`
  }

  // (optional) event driven initialization that will happen only once
  // the ideal constructor substitute for any sort of one-off init
  // this is triggered only once the component goes live, never before *
  // * unless explicitly dispatched, of course
  oninit(event) {}

  // (optional) event driven lifecycle methods, added automatically when
  // no Custom Elements native methods such as connectedCallback, and others
  // have been explicitly set as methods
  onconnected(event) {}
  ondisconnected(event) {}
  onattributechanged(event = {attributeName, oldValue, newValue}) {}

  // (optional) populate this button content
  //            (kinda useless with void elements such img, input, ...)
  render() {
    // this.html or this.svg are provided automatically
    this.html`Click ${this.props.name}!`;
  }

  // (optional) automatically defined to trigger
  // this[`on${event.type}`](event);
  handleEvent(event) {}

  // (optional) automatically defined to return this.getAttribute('is')
  get is () {}
}

// components can be defined both as classes or objects
const Generic = {

  // both name and extends are optional
  // if defined via define('Name:extends', object)
  name: 'Generic',
  extends: 'element', // or div, p, etc

  // statics are defined on the derived class
  style(selector) {},
  observedAttributes: [],

  // all events supported too
  oninit() {}
};

// define the custom element via class (requires static name and tagName)
define(MyButton);

// or define the custom element via Component:tag
define('MyButton:button', MyButton);

// **experimental** optionally usable for local components definition
const {local} = define;
local(MyButton);
local('MyButton:button', MyButton);

// populate some node
render(document.body, html`<MyButton props=${{name: 'Magic'}} />`);

setTimeout(() => console.log(document.body.innerHTML));
// <button is='my-button-heresy'>Click Magic!</button>
```


## Compatibility

The [test page](https://webreflection.github.io/heresy/test/) uses, and describes, few techniques to address all browsers, from IE9 to latest evergreen.

The following list describes the _heresy_'s compatibility break down:

  * IE9 and IE10 *might* need an `Object.freeze` patch, to avoid breaking on frozen template literals when passed to polyfilled WeakMaps. The patch checks for the existence of `WeakMap`, hence it's completely safe for any modern browser, including IE11.
  * old Edge and all IE might need a Custom Elements polyfill upfront. In this case the famous [document-register-element](https://github.com/WebReflection/document-register-element) would be the suggested choice, since it patches built in right away too.
  * Safari and WebKit have an understandable but pretty stubborn position regarding built-in elements, so that a 1K [polyfill](https://github.com/ungap/custom-elements-builtin) is needed, in case you target Safari and WebKit too.


### Broader compatibility in a nutshell

```html
<script>
  // Patch for IE9 and IE10 (browsers with no WeakMap)
  // frozen template literals cannot be addressed by common WeakMap polyfills
  // this patch avoid Object.freeze to break when template literals are passed to WeakMaps
  this.WeakMap||!function(O,f){f=O.freeze;O.freeze=function(o){return 'raw' in o?o:f(o)}}(Object);
</script>
<script>
  // Patch for all IE, Edge, and older browsers without customElements
  // completely ignored/irrelevant for any other modern browser
  // https://github.com/WebReflection/document-register-element
  this.customElements||document.write(
    '<script src="https://unpkg.com/document-register-element"><\x2fscript>'
  );
</script>
<script defer src="https://unpkg.com/@ungap/custom-elements-builtin">/*
  1K Patch for Safari/WebKit
  https://github.com/ungap/custom-elements-builtin
*/</script>
```


## Concept

Custom Elements builtin are likely the best thing we have to build components the way we want to.

Instead of using a non standard indirection as JSX is, we can use the power of [domtagger](https://github.com/WebReflection/domtagger#domtagger), the [hyperHTML](https://github.com/WebReflection/hyperHTML) and [lighterhtml](https://github.com/WebReflection/lighterhtml) tag engine, to replace once any `<DefinedElement />` with, or without nested nodes.

The Custom Elements V1 API provides enough primitives to intercepts any sort of attribute (i.e. the `props` in the example), but also react on events such `connectedCallback` or `disconnectedCallback` and `attributeChangedCallback`.

Mixed up with builtin extends in a way that any component is a real thing on the DOM, instead of a facade of itself, _herey_ makes creation of simple to complex App a no-brainer: define the content through `this.html` or `this.svg` and that's it.

When any class is defined, it's not just necessarily a useless `HTMLElement`, it can be pretty much any kind of element.

The following example is [live in Code Pen](https://codepen.io/WebReflection/pen/eoxobK?editors=0010).
```js
import {define, ref, html, render} from 'heresy';

// a div
define(class Div extends HTMLDivElement {
  static get name() { return 'Div'; }
  static get tagName() { return 'div'; }
});

// a paragraph
define('P:p', class extends HTMLParagraphElement {});

// a h1
define('H1:h1', class extends HTMLHeadingElement {});

// render them all + ref example
const refs = {};

// refs can be created right away
refs.div = ref();

// or within the render
render(document.body, html`
  <Div ref=${refs.div}>
    <H1 ref=${ref(refs, 'h1')}>Hello there</H1>
    <P>This is how custom elements look via heresy.</P>
    <P>Isn't this awesome?</P>
  </Div>
`);

console.log(refs.h1.current); // the H1 instance/node
```

### About the experimental `local` definition

Currently, using `define.local` instead of `define` simply grants that a specific `TagName` can be redefined at any time.

However, the definition of the previous `TagName` won't necessarily match anymore the class, or object, used before, so that it's higly discourage, at least at this point and until there is a better mechanism in place, to rely on the local functionality.



## Goals

  * declared elements are the instance you'd expect (no virtual, no facade)
  * declared elements can be of any kind (table, tr, select, option, ...)
  * any attribute change, or node lifecycle, can be tracked via Custom Elements V1 API (no componentDidMount and friends)
  * no redundant dom nodes, no ghost fragments, a clean as possible output
  * it's SSR (Server Side Rendering) friendly


## CSS - How to query or style globally defined components

Every global builtin extend will have a `-heresy` suffix to ensure both that the Custom Element can be registered, but also grant a common pattern to reach components.

```css
*[is$='-heresy']:hover {
  opacity: .8;
}

/* ⚠ usable only via define, not define.local */
tag[is='specific-heresy'] {
  display: block;
}
```

## CSS - How to query or style locally defined components

When `define.local(...)` is used instead, the suffix will have an incremental number. Instead of addressing a specific suffix, it is suggested to address the prefix.

```css
/* ℹ usable for both define and define.local */
tag[is^='my-button-'] {
  display: block;
}
```
