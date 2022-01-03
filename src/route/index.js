/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 17:24:58
 * @LastEditTime: 2022-01-01 16:08:02
 * @FilePath: \vite-project\src\route\index.js
 */
import Layout from '@/Layout';
import Login from '@/views/login';
import { createWebHistory, createRouter } from 'vue-router';
import routes from './routes';
routes.map((i) => {
  i.component = Layout;
});
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Root',
      path: '/',
      redirect: {
        name: 'main',
      },
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    ...routes,
  ],
});

export default router;
