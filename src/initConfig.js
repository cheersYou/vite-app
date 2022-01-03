/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 21:43:39
 * @LastEditTime: 2022-01-01 15:42:09
 * @FilePath: \vite-project\src\initConfig.js
 */

import { getAppConfig } from './api/public';
import store from './store';

export default async () => {
  const config = await getAppConfig();
  const configEnv = config[import.meta.env.MODE];
  for (const i in config) {
    if (typeof config[i] !== 'object') {
      configEnv[i] = config[i];
    }
  }
  store.dispatch('app/setConfig', configEnv);
  return configEnv;
};
