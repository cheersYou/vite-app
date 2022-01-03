/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-01-01 16:06:17
 * @LastEditTime: 2022-01-01 16:37:28
 * @FilePath: \vite-project\src\permission.js
 */

import router from '@/route';
import store from '@/store';

function isMicroRoute(apps, to) {
  const path = to.path;
  return apps.some((app) => {
    if (to.name) {
      return app.name === to.name;
    }
    if (Array.isArray(app.activeRule)) {
      return app.activeRule.some((rule) => path.startsWith(rule));
    }
    return path.startsWith(app.activeRule);
  });
}
export default (apps = []) => {
  router.beforeEach((to, from, next) => {
    const bool = isMicroRoute(apps, to);
    if (bool) {
      store.dispatch('app/setCurRoute', null);
      next();
      return;
    }
    store.dispatch('app/setCurRoute', to);
    next();
  });
};
