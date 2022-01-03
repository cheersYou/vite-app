/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 20:56:47
 * @LastEditTime: 2021-12-31 21:58:50
 * @FilePath: \vite-project\src\api\public.js
 */
import { originGet } from '.';
export const getWidgetConfig = (name) => {
  return name;
};
export const getAppConfig = () => {
  return originGet('/static/appConfig.json', '获取系统配置文件');
};
