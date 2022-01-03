/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-30 22:57:54
 * @LastEditTime: 2021-12-31 13:58:32
 * @FilePath: \vite-project\src\utils\index.js
 */
const Font_SIZE = getComputedStyle(document.documentElement)['fontSize'];

export const transformUnit = (value) => {
  return isNaN(Number(value)) ? value : value + 'px';
};
export const cacheArgFn = (fn) => {
  const cached = new Map();
  return function (key) {
    let res = cached.get(key);
    if (!cached.has(key)) {
      res = fn.call(null, key);
      cached.set(key, res);
    }
    return res;
  };
};
export const computedPx = cacheArgFn((expression) => {
  if (typeof expression !== 'string') return expression;
  expression = expression.replace(/\s+/g, '');
  let list = expression.match(/[-]?\d+[.]?(\d+)?(rem)?(px)?/g) || [];
  list = list.map((i) => {
    if (i.includes('rem')) {
      return parseFloat(i) * parseFloat(Font_SIZE);
    }
    return parseFloat(i);
  });
  return list.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
});

export const cachedFn = (fn) => {
  let cached = new WeakMap();
  return function () {
    let res = cached.get(fn);
    if (!res) {
      res = fn.apply(null, arguments);
      cached.set(fn, res);
    }
    return res;
  };
};
