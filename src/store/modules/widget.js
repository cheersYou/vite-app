/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 14:55:12
 * @LastEditTime: 2021-12-29 23:37:15
 * @FilePath: \vite-project\src\store\modules\widget.js
 */
import { closeWidget, openWidget } from '@/utils/widget';
import { ACTIVE_WIDGET, DEACTIVE_WIDGET, ALL_WIDGET } from '../types';
export default {
  state: {
    widgetMap: {},
    activeMap: {},
  },
  mutations: {
    [ACTIVE_WIDGET](state, name) {
      state.activeMap[name] = state.widgetMap[name];
    },
    [DEACTIVE_WIDGET](state, name) {
      delete state.activeMap[name];
    },
    [ALL_WIDGET](state, widgetMap) {
      state.widgetMap = widgetMap;
    },
  },
  actions: {
    async openWidget({ state, commit }, name, props = {}) {
      const widgetOption = state.widgetMap[name];
      if (!widgetOption) {
        throw new Error(`微件${name}不存在！`);
      }
      commit(ACTIVE_WIDGET, name);
      return await openWidget(widgetOption, props);
    },
    closeWidget({ state, commit }, name) {
      const widgetOption = state.activeMap[name];
      if (!widgetOption) {
        throw new Error(`微件${name}不存在！`);
      }
      closeWidget(widgetOption);
      commit(DEACTIVE_WIDGET, name);
    },
    closeAllWidget({ state }) {
      for (const name in state.activeMap) {
        this.dispatch('widget/closeWidget', name);
      }
    },
    initWidget({ commit }, widgetMap) {
      commit(ALL_WIDGET, widgetMap);
    },
  },
  getters: {
    activeMap: (state) => state.activeMap,
    widgetMap: (state) => state.widgetMap,
  },
};
