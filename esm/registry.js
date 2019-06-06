export const registry = {
  map: {},
  re: null
};

export const regExp = keys => new RegExp(
  `<(/)?(${keys.join('|')})([^A-Za-z0-9_])`,
  'g'
);

export const replace = (markup, info) => {
  const {map, re} = info;
  return markup.replace(re, (_, close, name, after) => {
    const {tagName, is} = map[name];
    return close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`;
  });
}
