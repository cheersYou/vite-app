/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 21:50:26
 * @LastEditTime: 2022-01-01 01:00:15
 * @FilePath: \vite-project\src\register\index.js
 */
import router from '@/route';
import store from '@/store';
import components from '@/components';
import { message } from 'ant-design-vue';
export default (app) => {
  app.use(components);
  widgetRegister(app);
};

export const widgetRegister = (app) => {
  app.use(store);
  app.use(router);
  app.config.globalProperties.$message = message;
};
