# ![heresy logo](heresy.png) heresy
Don't simulate the DOM. Be the DOM.
- - -
<sup>**Social Media Photo by [Alexey Zhavoronkov](https://twitter.com/alexusrnd) from [a2.agencylash](https://a2.agency/)**</sup>

![WebReflection status](https://offline.report/status/webreflection.svg) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) [![Build Status](https://travis-ci.com/WebReflection/heresy.svg?branch=master)](https://travis-ci.com/WebReflection/heresy) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/heresy.svg)](https://greenkeeper.io/)

React-like Custom Elements via the V1 API built-in extends. **[Also available for SSR](https://github.com/WebReflection/heresy-ssr#readme).**

- - -

## What is this _heresy_ ?

This project is some sort of answer to these major trends:

  * believing you cannot have tiny APIs which are able to compete with most famous frameworks
  * believing custom elements are not cool enough to compete with such frameworks
  * believing the built-in extends of custom elements are unnecessary or not useful at all

Borrowing concepts and patterns from various libraries, _heresy_ enables custom elements as you've never seen before:

  * declarative UI (i.e. `<Component class=${...}><Section data=${{...}}/></Component>`) without needing JSX transformations or tooling at all
  * locally scoped custom elements to avoid name clashing and make components reusable in any context, similarly to what you can do with React components
  * automatic component name definition passed through the optional `Component.style(...selectors)` to inject related styles only once per definition
  * automatic [handleEvent](https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38) pattern so that you can forget the unnecessary overhead of `this.method = this.method.bind(this)`
  * out of the box lifecycle events, such as `oninit(event)`, `onconnected(event)`, `ondisconnected(event)` or `onattributechanged(event)`, so that you can skip the ugly `attributeChangedCallback` and other unintuitive callbacks right away (but still use them if you like)
  * out of the box `observedAttributes` and `booleanAttributes` behavior, borrowed directly from [HyperHTMLElement](https://github.com/WebReflection/hyperHTML-Element#readme) Class
  * automatic, smart component initializer via `Component.new()` that avoids all the quirks related to the initialization of custom elements and built-ins
  * an ever available `comp.is` string (you won't believe it's not always an attribute if created procedurally via a registered class)
  * automatic, lazy `this.html` and `this.svg` template literal tags, to populate a component's content within its optionally, locally scoped defined elements
  * provides a simplified way to target rendered nodes through the React-like `ref()` utility
  * **hooks** implemented, and exported, through [augmentor](https://github.com/WebReflection/augmentor#readme). Define `hooks: true` and use any of the avilable hooks within the render method.


### Usage in a nutshell

A component can be defined through both classes or raw object literals.

```js
// <Item props=${{name}} />

// as object literal
const literal = {
  name: 'Item',
  extends: 'li',  // will extends li constructor
  render() {
    this.html`my name is ${this.props.name}`;
  }
};

// as class
class Item extends HTMLLiElement {
  static name = 'Item';   // necessary if code gets transpiled
  static tagName = 'li';  // necessary to indicate the kind
  render() {
    this.html`my name is ${this.props.name}`;
  }
}
```

While both the name and tag it represents, can be defined within the class or object, it's rather suggested to pre-define at least the tag it's going to represent, but not the name.

```js
const literal = {
  extends: 'li',
  render() { this.html`my name is ${this.props.name}`; }
};

// in this way it's possible to define the name only via
define('Item', literal);
```

Alternatively, it is possible to not include name and tag, defining these via the `Comp:tag` or `Comp<tag>` convention.

```js
class Item extends HTMLLiElement {
  render() { this.html`my name is ${this.props.name}`; }
}

define('MyItem<li>', Item);
// OR
define('MyItem:li', Item);
```


#### Which tag ?

The beauty and power of the built-in extends of custom elements is that you can literally represent any tag you want/need.

However, if you'd like to simply extend a non-standard tag, you can always fall back to the `element` tag kind, which will extend `HTMLElement`, and represent the component through its retrieved `<hyphen-ized-heresy>` name.

```js
// either as object
const Component = {
  extends: 'element',
  onconnected() { console.log(this.outerHTML); }
};

// or as class
class Component extends HTMLElement {
  static get tagName() { return 'element'; }
  onconnected() { console.log(this.outerHTML); }
};

const MyElement = heresy.define('MyElement', Component);
document.body.appendChild(MyElement.new());
// in console: <my-element-heresy></my-element-heresy>
```


### Local components in a nutshell

While `define(...)` will use the global registry to define the specific declarative name, making it a good practice to namespace it (i.e. `FWDatePicker`, `StencilForm` etc.), it is possible to define local components through the usage of `includes`, also aliased as `contains`.

Such a list will still pass through the registry, so that local components are fully valid custom elements that never name-clash with anything else, so that it's easier to split complex components into various sub-modules and only define their main container globally.

The following example has been rewritten with extra details and is [live on codepen](https://codepen.io/WebReflection/pen/argjeV?editors=0010).

```js
import {define, ref, render, html} from 'heresy';

import {User, Pass} from './form/ui.js';
import {validate, switchPage} from './form/utils.js';

const Form = {
  extends: 'form',
  includes: {User, Pass},
  oninit() {
    // refs can be declared upfront or inline (see render)
    this.user = ref();
    this.addEventListener('submit', this);
  },
  onsubmit(event) {
    event.preventDefault();
    if (validate(this.user.current, this.pass.current))
      fetch('/log-in').then(switchPage).catch(console.error);
  },
  // render is invoked automatically on connected
  // if no connected, or callback is explicitly defined
  render() {
    this.html`
    <label>Your name: <User ref=${this.user} name="user"></label>
    <label>Your pass: <Pass ref=${ref(this, 'pass')} name="pass"></label>
    `;
  }
};

define('SiteLogin', Form);
render(document.body, html`<SiteLogin/>`);
```

The `includes` or `contains` property, if present, must be a map of `"Name": Component` pairs, where the name could also define the tag type, like it does with `define(...)`.

In the previous example both `User` and `Pass` are components extending `input`, so that the tag name is not necessary, but `{"User<button>": User}`, or `{"User:button": User}`, would eventually be valid as a local component.


#### How can components be local?
The main difference with local components is that their registry name gets polluted with a unique identifier, so that instead of `<input is="user-heresy">` the outcome would be `<input is="user-xxx-heresy">`. The unique identifier in between (`xxx`) is added in cases where a component can be defined or used together with many other components, so that name clashing won't ever be an issue.


### Class and object API summary

A similar example is [live in Code Pen](https://codepen.io/WebReflection/pen/WWPWdR?editors=0010).

```js
import {define, html, render} from 'heresy';

// classes or objects, to define components, are the same
class MyButton extends HTMLButtonElement {

  // (optional) static fields to define the component/class name or tag
  // use define('MyButton:button', MyButton); if you want to avoid this
  static get name() { return 'MyButton'; }
  static get tagName() { return 'button'; }

  // (optional) static callback to style components (once per definition)
  //            when there are local components, it will receive also these
  //            in definition order
  static style(MyButton) {
    // the component could be scoped so that
    // to be sure the selector is the right one
    // always use the received component to define its styles
    return `${MyButton} {
      border: 2px solid black;
    }`
  }

  // (optional) static field that is `false` by default, but if true
  //            enables the usage of hooks within the render() method
  static get hooks() { return true; }

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

  // (optional) attributes that can either be true or false once accessed
  // reflected on the DOM as either present, or not
  get booleanAttributes() { return ['checked']; }

  // (optional) store any value directly and dispatch `on${name}` on changes
  get mappedAttributes() { return ['data']; }
  // if `ondata(event){}` is defined, event.detail will have the new value

  // (optional) native Custom Elements behavior with changes dispatched
  // through the onattributechanged callback
  get observedAttributes() { return ['name', 'age']; }

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
  booleanAttributes: [],

  // all other events supported too
  oninit() {}
};

// define the custom element via class (requires static name and tagName)
define(MyButton);

// or define the custom element via Component:tag
define('MyButton<button>', MyButton);

// populate some node
render(document.body, html`<MyButton props=${{name: 'Magic'}} />`);

setTimeout(() => console.log(document.body.innerHTML));
// <button is='my-button-heresy'>Click Magic!</button>
```


## Compatibility

The [test page](https://webreflection.github.io/heresy/test/) uses and describes a few techniques to address all browsers, from IE9 to latest evergreen.

The following list describes the _heresy_'s compatibility break down:

  * IE9 and IE10 *might* need an `Object.freeze` patch, to avoid breaking on frozen template literals when passed to polyfilled WeakMaps. The patch checks for the existence of `WeakMap`, hence it's completely safe for any modern browser, including IE11.
  * old Edge and all IE might need a Custom Elements polyfill upfront. In this case the famous [document-register-element](https://github.com/WebReflection/document-register-element) would be the suggested choice, since it patches built-ins right away, too.
  * Safari and WebKit have an understandable but pretty stubborn position regarding built-in elements, so that a 1K [polyfill](https://github.com/ungap/custom-elements-builtin) is needed in case you target Safari and WebKit.
  * you don't need a polyfill for Safari if you only extend `element`, but you'll miss out 90% of the fun with programming through built-in extends


### Broader wider compatibility in a nutshell

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

Alternatively, you can use this minified version to never download the Safari-only polyfill.

```html
<script>if(this.customElements)try{customElements.define('built-in',document.createElement('p').constructor,{'extends':'p'})}catch(a){document.write('<script src="//unpkg.com/@ungap/custom-elements-builtin"><'+'/script>')}else document.write('<script src="//unpkg.com/document-register-element"><'+'/script>');</script>
```



## Concept

Custom Elements built-ins are likely the best thing we have to build components the way we want to.

Instead of using a non standard indirection as JSX is, we can use the power of [domtagger](https://github.com/WebReflection/domtagger#domtagger), the [hyperHTML](https://github.com/WebReflection/hyperHTML) and [lighterhtml](https://github.com/WebReflection/lighterhtml) tag engine, to replace once any `<DefinedElement />` with or without nested nodes.

The Custom Elements V1 API provides enough primitives to intercept any sort of attribute (i.e. the `props` in the example), but also react to events such `connectedCallback` or `disconnectedCallback` and `attributeChangedCallback`.

Mixed up with built-in extends in a way that any component is a real thing on the DOM instead of a facade of itself, _herey_ makes the creation of apps, from simple to complex, a no-brainer: define the content through `this.html` or `this.svg` and that's it.

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
define('P<p>', class extends HTMLParagraphElement {});

// a h1
define('H1<h1>', class extends HTMLHeadingElement {});

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


### Local components live example

You can see the [following example live](https://webreflection.github.io/heresy/test/local.html).
```js
// p.js - could be an object too
export default class extends HTMLParagraphElement {
  static get tagName() { return 'p'; }
  oninit() {
    console.log(this.outerHTML);
  }
};

// first.js - it has a local P
import P from './p.js';
export default {
  extends: 'div',
  includes: {P},  // with its own definition
  render() {
    this.html`<P>first</P>`;
  }
};

// second.js - it uses P again as local
import P from './p.js';
export default {
  extends: 'div',
  includes: {P},  // with its own definition
  render() {
    this.html`<P>second</P>`;
  }
};

// index.js
const {define, render, html} = heresy;

import First from './first.js';
import Second from './second.js';

const Div = define('Div', {
  extends: 'div',
  includes: {First, Second},
  render() {
    this.html`<First/><Second/>`;
  }
});

// either
render(document.body, html`<Div/>`);
// or even document.body.appendChild(Div.new());

```

## CSS - The components style precedence

Components are defined once per kind, and the styles of local components are appended live before the outer component, giving it the ability to force extra styles when needed, or improve the specificity for a specific component/style when used within some other.

```js
const Div = define('Div', {
  extends: 'div',
  includes: {First, Second},
  // will receive the selectors for self and included components
  style(Div, First, Second) {
    // since outer component style is injected after
    // it is possible to eventually overwrite nested
    // components through higher priority / specificity
    return `
      ${Div} { font-size: 16px; }
      ${Div} > ${First} { padding: 0; }
      ${Div} ${Second} { font-weight: smaller; }
    `;
    console.log([Div, First, Second].join(', '));
  },
  render() {
    this.html`<First/><Second/>`;
  }
});
```

You can see what the `style(...)` receives reading the console in this [live demo](https://webreflection.github.io/heresy/test/local.html).


## CSS - How to query or style all globally defined components

Every global built-in extend will have a `-heresy` suffix to ensure both that the Custom Element can be registered, but also grant a common pattern to reach components.

```css
*[is$='-heresy']:hover {
  opacity: .8;
}

/* ⚠ too specific: it does not work with local components */
tag[is='specific-heresy'] {
  display: block;
}
```

## CSS - How to query or style local components

When components are defined locally, there will be an incremental number between the component name and the `-heresy` suffix.

Instead of addressing a specific suffix, it is instead suggested to address the known prefix.

```css
/* ℹ usable for both globally registered and nested components */
tag[is^='my-button-'] {
  display: block;
}
```

- - -

## Project Showcases

  * the classic [TodoMVC](https://github.com/WebReflection/heresy-todo)

## Project Achievements

  * declared elements are the instance you'd expect (no virtual, no facade)
  * declared elements can be of any kind (table, tr, select, option, ...), including element
  * declare any component within other components, breaking the limits of a single, name-clashing based registry
  * any attribute change, or node lifecycle, can be tracked via the Custom Elements V1 API (no componentDidMount and friends)
  * `oninit`, `onconnected`, `ondisconnected`, and `onattributechanged` events out of the box
  * `handleEvent` paradigm out of the box
  * `observedAttributes` and `booleanAttributes` do what everyone expects these to do
  * no redundant dom nodes, no ghost fragments, an "as clean as possible" output
  * the performance of lighterhtml, fine tuned for this specific use case
  * it's [SSR (Server Side Rendering) friendly](https://github.com/WebReflection/heresy-ssr#readme), and custom elements hydrate automatically
  * usage of `ref` to simplify reaching nodes after render
  * automatic `render` when the method is present and no `onconnected` or `connectedCallback` has been explicitly defined
  * CSS specificity is granted per each component via `style: selector => '...'` so that **there is no need to use Shadow DOM** and the heavy polyfills related to it
