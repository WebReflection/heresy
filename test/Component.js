const Component = {
  extends: 'element',

  includes: {Other, Tags},

  style: (Component, Other, Tags) => `
    ${Component} {}
    ${Other} {}
    ${Tags} {}
  `,

  oninit() {},
  onconnected(event) {},
  ondisconnected(event) {},

  booleanAttributes: [],
  observedAttributes: [],
  onattributechanged(event = {attributeName, oldValue, newValue}) {},

  mappedAttributes: [],
  on${mappedAttribute}(event = {detail}) {},

  render() {
    this.html`<Other/><Tags/>`;
  }
};
