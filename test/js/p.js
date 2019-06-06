export default class extends HTMLParagraphElement {
  static get tagName() { return 'p'; }
  oninit() {
    console.log(this.outerHTML);
  }
};
