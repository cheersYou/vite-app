/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-01-01 14:55:59
 * @LastEditTime: 2022-01-05 01:45:57
 * @FilePath: \vite-project\src\qiankun.js
 */

import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
export default (config) => {
  const apps = config.APPS || [];
  apps.map((app) => {
    app.props = {
      base: app.activeRule,
    };
  });
  console.log('hello');
  registerMicroApps(apps, {
    beforeLoad: (app) => console.log('before load', app.name),
    beforeMount: [(app) => console.log('before mount', app.name)],
  });
  start({
    prefetch: 'all',
    sandbox: {
      experimentalStyleIsolation: true,
    },
  });
  addGlobalUncaughtErrorHandler(errorHandler);
  return apps;
};

const errorHandler = (e) => {
  console.error(e);
};
