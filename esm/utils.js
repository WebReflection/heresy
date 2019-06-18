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

const hash = s => {
  const {length} = s;
  let t = 0;
  let i = 0;
  while (i < length) {
    t = ((t << 5) - t) + s.charCodeAt(i++);
    t = t & t;
  }
  return t.toString(36);
};

const registry = {
  map: {},
  re: null
};

const regExp = keys => new RegExp(
  `<(/)?(${keys.join('|')})([^A-Za-z0-9:_-])`,
  'g'
);

let tmp = null;
const replace = (markup, info) => {
  const {map, re} = (tmp || info);
  return markup.replace(re, (_, close, name, after) => {
    const {tagName, is, element} = map[name];
    return element ?
      (close ? `</${is}>` : `<${is}${after}`) :
      (close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`);
  });
};

const selector = ({tagName, is, element}) =>
                  element ? is : `${tagName}[is="${is}"]`;

const getInfo = () => tmp;
const setInfo = info => { tmp = info; };

export {
  extend,
  hash,
  registry,
  regExp,
  replace,
  selector,
  getInfo,
  setInfo
};
