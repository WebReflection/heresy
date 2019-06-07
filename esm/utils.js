const registry = {
  map: {},
  re: null
};

const regExp = keys => new RegExp(
  `<(/)?(${keys.join('|')})([^A-Za-z0-9_])`,
  'g'
);

const replace = (markup, info) => {
  const {map, re} = info;
  return markup.replace(re, (_, close, name, after) => {
    const {tagName, is} = map[name];
    return tagName === 'element' ?
      (close ? `</${is}>` : `<${is}${after}`) :
      (close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`);
  });
}

export {
  registry,
  regExp,
  replace
};
