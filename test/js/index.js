const {define, html, render} = heresy;

// define the custom element (class name mandatory)
define('MyButton:button', class extends HTMLButtonElement {

  // (optional) intercepts some attribute (any value)
  set props(props) { this._props = props; }
  get props() { return this._props; }

  // (optional) populate this button content
  //            (kinda useless with void elements such img, input, ...)
  render() {
    // this.html or this.svg are provided automatically
    this.html`Click ${this.props.name}!`;
  }
});

// a div
define('Div:div', class extends HTMLDivElement {});

// a paragraph
define('P:p', class extends HTMLParagraphElement {});

// a h1
define('H1:h1', class extends HTMLHeadingElement {});

render(document.body, () => html`
  <Div>
    <H1>Hello there</H1>
    <P>This is how custom elements look via heresy.</P>
    <P>Isn't this awesome?</P>
  </Div>
  <MyButton props=${{name: 'Magic'}}/>
`);
