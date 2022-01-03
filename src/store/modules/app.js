/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 22:02:32
 * @LastEditTime: 2022-01-01 16:05:17
 * @FilePath: \vite-project\src\store\modules\app.js
 */
import { APP_CONFIG, CUR_ROUTE } from '../types';
export default {
  state: {
    config: {},
    curRoute: {},
  },
  mutations: {
    [APP_CONFIG](state, config) {
      state.config = config;
    },
    [CUR_ROUTE](state, route) {
      state.curRoute = route;
    },
  },
  actions: {
    setConfig({ commit }, data) {
      commit(APP_CONFIG, data);
    },
    setCurRoute({ commit }, route) {
      commit(CUR_ROUTE, route);
    },
  },
  getters: {
    config: (state) => state.config,
    curRoute: (state) => state.curRoute,
  },
};
