const registry = {
  map: {},
  re: null
};

const regExp = keys => new RegExp(
  `<(/)?(${keys.join('|')})([^A-Za-z0-9_])`,
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
  registry,
  regExp,
  replace,
  selector,
  getInfo,
  setInfo
};
