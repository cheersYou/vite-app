/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 22:03:11
 * @LastEditTime: 2021-12-31 22:01:11
 * @FilePath: \vite-project\src\utils\Http.js
 */
import axios from 'axios';
const symbolId = Symbol();
const CancelToken = axios.CancelToken;
export default class Http {
  constructor({
    BASEURL,
    TIMEOUT = 1000 * 60 * 10, // 10分钟
    errorHandler = function () {},
    isCancel = true,
  }) {
    this.instance = axios.create({
      baseURL: BASEURL, // 自动加在 url 前面
      timeout: TIMEOUT,
      withCredentials: true,
    });
    this[symbolId] = new Map();
    // 拦截请求
    this.instance.interceptors.request.use(
      (config) => {
        if (isCancel) {
          const key = `${config.method}-${config.url}`;
          cancelHandler(this[symbolId], key);
          if (!config.cancelToken) {
            config.cancelToken = new CancelToken((cancel) => {
              this[symbolId].set(key, cancel);
            });
          }
        }
        return config;
      },
      (error) => {
        if (!axios.isCancel(error)) {
          errorHandler(error);
          return Promise.reject(error);
        }
      },
    );
    // 拦截响应
    this.instance.interceptors.response.use(
      ({ config, data }) => {
        if (isCancel) {
          const key = `${config.method}-${config.url}`;
          cancelHandler(this[symbolId], key);
        }
        // 默认返回数据内容类型是json
        return Promise.resolve(data);
      },
      (error) => {
        if (!axios.isCancel(error)) {
          errorHandler(error);
          return Promise.reject(error);
        }
      },
    );
    return this.instance;
  }
  // url | url，params
  static get(...args) {
    return axios.get(...args);
  }
  // url，data
  static post(...args) {
    return axios.post(...args);
  }
}

function cancelHandler(map, key) {
  const cancel = map.get(key);
  if (cancel) {
    cancel();
    map.delete(key);
  }
}
