/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 18:19:21
 * @LastEditTime: 2021-12-12 18:39:51
 * @FilePath: \vite-project\src\store\modules\index.js
 */
const modules = import.meta.globEager('./*.js');
const store = {};
for (const [path, module] of Object.entries(modules)) {
  const name = path.replace(/^\.\/(.*\/)?/, '').replace(/\.js$/, '');
  if (!module.default.namespaced) {
    module.default.namespaced = true;
  }
  store[name] = module.default;
}
export default store;
