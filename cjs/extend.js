'use strict';
let transpiled = null;
// the angry koala check @WebReflection/status/1133757401482584064
try { transpiled = new {o(){}}.o; } catch($) {}

let extend = Super => class extends Super {};
if (transpiled) {
  const {getPrototypeOf, setPrototypeOf} = Object;
  const {construct} = typeof Reflect === 'object' ? Reflect : {
    construct(Super, args, Target) {
      const a = [null];
      for (let i = 0; i < args.length; i++)
        a.push(args[i]);
      const Parent = Super.bind.apply(Super, a);
      return setPrototypeOf(new Parent, Target.prototype);
    }
  };
  extend = function (Super, cutTheMiddleMan) {
    function Class() {
      return construct(
        cutTheMiddleMan ?
          getPrototypeOf(Super) :
          Super,
        arguments,
        Class
      );
    }
    setPrototypeOf(Class.prototype, Super.prototype);
    return setPrototypeOf(Class, Super);
  };
}

Object.defineProperty(exports, '__esModule', {value: true}).default = extend;
