/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 12:44:17
 * @LastEditTime: 2021-12-29 21:40:14
 * @FilePath: \vite-project\src\components\index.js
 */
import { defineAsyncComponent } from 'vue';
const modules = Object.assign({}, import.meta.glob('./*.vue'), import.meta.glob('./*/*.vue'));
export default (app) => {
  for (const [path, module] of Object.entries(modules)) {
    const name = path.replace(/^\.\/(.*\/)?/, '').replace(/.vue$/, '');
    app.component(name, defineAsyncComponent(module));
  }
};
