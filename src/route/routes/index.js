/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 17:27:20
 * @LastEditTime: 2021-12-12 18:21:13
 * @FilePath: \vite-project\src\route\routes\index.js
 */

const modules = import.meta.globEager('./*.js');
export default Object.values(modules)
  .map((module) => module.default)
  .flat(1);
