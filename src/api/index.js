/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 22:02:47
 * @LastEditTime: 2021-12-31 22:01:44
 * @FilePath: \vite-project\src\api\index.js
 */

import Http from '@/utils/Http';

const errorHandler = (error) => {
  console.error(error);
};

const instanceMap = {
  base: null, // 当前系统ip下的请求
  origin: new Http({
    errorHandler,
  }), // 完整的url请求
  business: null, // 后台接口请求
};

// 初始化默认实例
export const initAxiosInstance = (config = {}) => {
  if (!config) return;
  const {
    BASEURL: { host, port },
  } = config;
  const BASEURL = `//${host || location.hostname}:${port}/`;
  instanceMap.base = new Http({
    BASEURL: BASEURL,
    errorHandler,
  });
};
// 初始化后台实例
export const initBusinessInstance = (config = {}) => {
  if (!config) return;
  const {
    BASEURL: { host, port, path },
  } = config;
  const BASEURL = `//${host || location.hostname}:${port}/${path}`;
  instanceMap.business = new Http({
    BASEURL: BASEURL,
    errorHandler,
  });
};
// 基础get方法
const get = (instance, url, serviceName = '未知服务', params = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method: 'get',
      ...params,
    })
      .then((res) => {
        resolve(res.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`get请求---${serviceName}---接口失败！`);
      });
  });
};
// 基础post方法
const post = (instance, url, serviceName = '未知服务', data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method: 'post',
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`post请求---${serviceName}---接口失败！`);
      });
  });
};
// 基础put方法
const put = (instance, url, serviceName = '未知服务', data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method: 'put',
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`put请求---${serviceName}---接口失败！`);
      });
  });
};
// 基础delete方法
const del = (instance, url, serviceName = '未知服务', data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method: 'delete',
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`delete请求---${serviceName}---接口失败！`);
      });
  });
};

export const GET = (url, serviceName, options) => {
  return get(instanceMap.base, url, serviceName, options);
};
export const POST = (url, serviceName, data, options) => {
  return post(instanceMap.base, url, serviceName, data, options);
};
export const PUT = (url, serviceName, data, options) => {
  return put(instanceMap.base, url, serviceName, data, options);
};
export const DELETE = (url, serviceName, data, options) => {
  return del(instanceMap.base, url, serviceName, data, options);
};

export const originGet = (url, serviceName, options) => {
  return get(instanceMap.origin, url, serviceName, options);
};

export const originPost = (url, serviceName, data, options) => {
  return post(instanceMap.origin, url, serviceName, data, options);
};
