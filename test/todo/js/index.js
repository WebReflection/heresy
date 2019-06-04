import Todo from './todo.js';

const {define, render, html} = heresy;

// global definition, no other Todo definition is possible
define('Todo:div', Todo);

render(document.body, html`<Todo items=${[{text: "todo", checked: false}]} />`);
