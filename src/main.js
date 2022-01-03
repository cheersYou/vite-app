/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 18:58:28
 * @LastEditTime: 2022-01-01 18:30:11
 * @FilePath: \vite-project\src\main.js
 */
import { createApp } from 'vue';
import App from '@/App.vue';
import install from '@/register';
import 'virtual:svg-icons-register';
import '@/style/index.scss';
import initConfig from './initConfig';
import { notification } from 'ant-design-vue';
import qiankun from './qiankun';
import permission from './permission';
(async () => {
  try {
    const config = await initConfig();
    const apps = qiankun(config);
    permission(apps);
    const app = createApp(App);
    app.use(install);
    app.mount('#app');
  } catch {
    notification.error({
      message: '系统错误',
      description: '加载配置文件失败！',
    });
  }
})();
