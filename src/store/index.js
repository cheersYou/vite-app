/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 18:19:09
 * @LastEditTime: 2021-12-12 21:21:57
 * @FilePath: \vite-project\src\store\index.js
 */
import { createStore } from 'vuex';
import modules from './modules';
const store = createStore({
  modules: modules,
});
export default store;
