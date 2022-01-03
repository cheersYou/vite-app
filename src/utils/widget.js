/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 14:00:25
 * @LastEditTime: 2021-12-31 20:16:57
 * @FilePath: \vite-project\src\utils\widget.js
 */
// 组件选项
// 组件实例
import { getWidgetConfig } from '@/api/public';
import DistPanel from '@/components/DistPanel';
import { widgetRegister } from '@/register';
import widgets from '@/widgets';
import { createApp, defineComponent } from 'vue';
const widgetMap = new Map();

// TODO:不做处理，按照规范书写（template只有一个根节点）
export const createWrapper = (el) => {
  const div = document.createElement('div');
  const ele = el.startsWith('#') ? document.querySelector(el) : el;
  ele.appendChild(div);
  return div;
};
export const createCompApp = (component, props = {}) => {
  const app = createApp(component, props);
  // do some global operates
  app.use(widgetRegister);
  return app;
};
const createPanel = (widgetOption = {}) => {
  widgetOption.closeHandler = () => closeWidget(widgetOption);
  return createCompApp(defineComponent(DistPanel), widgetOption);
};
const createWidget = async (widgetOption = {}, mixinProps = {}) => {
  const { component } = widgetOption;
  const componentOptions = await component();
  // !不异步引入,这样可以导出 vm 可以是完整的，mount 执行后组件 mounted 同步执行
  return createCompApp(defineComponent(componentOptions.default), mixinProps);
};

export const openWidget = async (widgetOption, mixinProps = {}) => {
  const { name, hasConfig, hasPanel, container, defaultHidden = false } = widgetOption;
  let widget = null,
    config = {};
  if (hasConfig) {
    config = await getWidgetConfig(name);
    mixinProps.config = config;
  }
  if (hasPanel) {
    widgetOption.mixinProps = mixinProps;
    widget = createPanel(widgetOption);
  } else {
    widget = await createWidget(widgetOption, mixinProps);
  }
  widgetMap.set(name, widget);
  let vm = widget.mount(container);
  // 寻找正确的根节点
  if (defaultHidden && vm?.$el) {
    let el = vm.$el;
    if (el.nodeType !== 1 || el.nodeType !== 2) {
      el = vm.$el.parentElement;
    }
    if (el?.style) el.style.display = 'none';
  }
  if (hasPanel) {
    if (vm?.compVM) vm = vm.compVM;
  }
  return vm;
};
export const closeWidget = (widgetOption = {}) => {
  const { name } = typeof widgetOption === 'object' ? widgetOption : { name: widgetOption };
  const widget = widgetMap.get(name);
  if (widget) widget.unmount();
  widgetMap.delete(name);
};

export const mergeWidget = (oms_widgets = []) => {
  const widgetMap = {};
  oms_widgets.forEach((widget) => {
    if (widget.name) widgetMap[widget.name] = widget;
  });
  widgets.forEach((widget) => {
    const name = widget.name,
      meta = widget.meta;
    if (widgetMap[name]) {
      widgetMap[name] = Object.assign({}, widget, widgetMap[name]);
      if (meta) {
        widgetMap[name].meta = Object.assign({}, meta, widgetMap[name].meta);
      }
    }
  });
  return widgetMap;
};
