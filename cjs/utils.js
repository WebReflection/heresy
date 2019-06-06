'use strict';
const {construct, setPrototypeOf} = Reflect;

const boomShakaLaka = Super => {
  function Class() { return construct(Super, arguments, Class); }
  setPrototypeOf(Class, Super);
  setPrototypeOf(Class.prototype, Super.prototype);
  return Class;
};

let detect = true;
let transpiled = !detect;

const extend = Super => {
  if (detect) {
    detect = !detect;
    // the angry koala check @WebReflection/status/1133757401482584064
    try { transpiled = !!new {o(){}}.o; } catch($) {}
  }
  return transpiled ? boomShakaLaka(Super) : class extends Super {};
};
exports.extend = extend;

