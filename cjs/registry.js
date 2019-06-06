'use strict';
const registry = {
  map: {},
  re: null
};
exports.registry = registry;

const regExp = keys => new RegExp(
  `<(/)?(${keys.join('|')})([^A-Za-z0-9_])`,
  'g'
);
exports.regExp = regExp;

const replace = (markup, info) => {
  const {map, re} = info;
  return markup.replace(re, (_, close, name, after) => {
    const {tagName, is} = map[name];
    return close ? `</${tagName}>` : `<${tagName} is="${is}"${after}`;
  });
}
exports.replace = replace
