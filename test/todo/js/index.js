import './todo.js';

const {render, html} = heresy;

render(document.body, () => html`
  <Todo items=${[]} />
`);
