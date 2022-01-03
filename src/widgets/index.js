/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 15:35:27
 * @LastEditTime: 2022-01-01 15:11:52
 * @FilePath: \vite-project\src\widgets\index.js
 */
// 组件
// 组件的位置、宽度和高度
// 组件的名字和标识
// 组件的容器
// 组件是否嵌套在面板内部
// 组件是否存在配置
export default [
  {
    title: '消息框',
    name: 'message-box',
    component: () => import('@/widgets/HelloWorld'),
    container: '#scene',
    meta: {
      width: '20rem',
    },
    hasConfig: true,
    hasPanel: true,
  },
];
