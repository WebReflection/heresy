const {construct, getPrototypeOf, setPrototypeOf} = Reflect;

let transpiled = null;
// the angry koala check @WebReflection/status/1133757401482584064
try { transpiled = new {o(){}}.o; } catch($) {}

export default transpiled ?
  function (Super, cutTheMiddleMan) {
    function Class() {
      return construct(
        cutTheMiddleMan ?
          getPrototypeOf(Super) :
          Super,
        arguments,
        Class
      );
    }
    setPrototypeOf(Class, Super);
    setPrototypeOf(Class.prototype, Super.prototype);
    return Class;
  } :
  Super => class extends Super {};
