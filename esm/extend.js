const {construct, setPrototypeOf} = Reflect;

let transpiled = false;
// the angry koala check @WebReflection/status/1133757401482584064
try { transpiled = !!new {o(){}}.o; } catch($) {}

export default transpiled ?
  function (Super) {
    const Class = function () {
      return construct(Super, arguments, Class);
    };
    setPrototypeOf(Class, Super);
    setPrototypeOf(Class.prototype, Super.prototype);
    return Class;
  } :
  Super => class extends Super {};
