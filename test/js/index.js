const {define, html, render, ref} = heresy;

// define the custom element (class name mandatory)
define('MyButton<button>', class extends HTMLButtonElement {

  oninit(event) {
    console.log(event.type, this.nodeName, this.is);
  }

  get mappedAttributes() { return ['props']; }

  // (optional) populate this button content
  //            (kinda useless with void elements such img, input, ...)
  render() {
    // this.html or this.svg are provided automatically
    this.html`Click ${this.props.name}!`;
  }
});

// a div
define('Div<div>', class extends HTMLDivElement {});

// a paragraph
define('P:p', class extends HTMLParagraphElement {});

// a h1
define('H1<h1>', class extends HTMLHeadingElement {});

// a span with content
define('Span<span>', {
  mappedAttributes: ['data'],
  ondata({detail}) {
    this.textContent = detail;
  }
});

render(document.body, () => html`
  <Div>
    <H1>Hello there</H1>
    <P>This is how custom elements look <Span data=${'via heresy'} />.</P>
    <P>Isn't this <Span data=${'awesome'}/>?</P>
  </Div>
  <MyButton props=${{name: 'Magic'}}/>
`);

setTimeout(() => {
  const H1 = {extends: 'h1'};
  const P = {extends: 'p'};
  const Span = {
    extends: 'span',
    mappedAttributes: ['data'],
    ondata({detail}) {
      this.innerHTML = `<em>${detail}</em>`;
    }
  };
  const Div = {
    extends: 'div',
    includes: {H1, P, Span},
    render() {
      this.html`
        <H1>Hello there</H1>
        <P>This is how custom elements look <Span data=${'via heresy'} />.</P>
        <P>Isn't this <Span data=${'awesome'}/>?</P>
      `;
    }
  };
  const MyButton = {
    extends: 'button',
    mappedAttributes: ['props'],
    onprops() { this.render(); },
    render() {
      this.html`Click ${this.props.name}!`;
    }
  };
  const Outer = {
    extends: 'fragment',
    includes: {Div, MyButton},
    mappedAttributes: ['value'],
    onvalue() {
      const {current: button} = ref(this, 'button');
      if (button)
        button.props = {name: this.value};
    },
    render() {
      this.html`<Div/><MyButton ref=${ref(this, 'button')} props=${{name: this.value}}/>`;
    }
  };

  define('Outer', Outer);
  setInterval(
    () => {
      render(document.body, () => html`<Outer .value=${Math.random()} />`);
    },
    1000
  );
}, 2000);
