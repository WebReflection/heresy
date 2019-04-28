const {define, html, render} = heresy;

// a div
define(class Div extends HTMLDivElement {
  static get tagName() { return 'div'; }
});

// a paragraph
define(class P extends HTMLParagraphElement {
  static get tagName() { return 'p'; }
});

// a h1
define(class H1 extends HTMLHeadingElement {
  static get tagName() { return 'h1'; }
});

// define the custom element (class name mandatory)
define(class MyButton extends HTMLButtonElement {

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
});

render(document.body, () => html`
  <Div>
    <H1>Hello there</H1>
    <P>This is how custom elements look via heresy.</P>
    <P>Isn't this awesome?</P>
  </Div>
  <MyButton props=${{name: 'Magic'}}/>
`);