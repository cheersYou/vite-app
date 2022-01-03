<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 19:55:25
 * @LastEditTime: 2021-12-30 20:07:34
 * @FilePath: \vite-project\src\components\DistPanel\Copy.vue
-->

<template>
  <div class="panel">
    <div class="panel-header" @mousedown="mouseDownHandler" @mouseup="mouseUpHandler">
      <div>{{ name }}</div>
    </div>
    <div ref="contentRef"></div>
    <div>Panel Footer</div>
  </div>
  <div
    ref="content"
    class="p-6"
    @dragenter="dragEnterHandler"
    @dragleave="dragLeaveHandler"
    @drop="dropHandler"
    @dragover="dragOverHandler"
  >
    容器
  </div>
</template>

<script>
import { defineAsyncComponent, nextTick } from 'vue';
import { createCompApp } from '@/utils/widget';
export default {
  name: 'DistPanel',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
    component: {
      required: true,
      type: Function,
    },
    mixinProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      compVM: null,
    };
  },
  mounted() {
    this.addComponent();
  },
  methods: {
    async addComponent() {
      await nextTick();
      const content = this.$refs['contentRef'];
      const app = createCompApp(defineAsyncComponent(this.component), this.mixinProps);
      this.compVM = app.mount(content);
    },
    mouseDownHandler() {},
    dragHandler() {
      // console.log(e);
    },
    dragStartHandler(e) {
      e.dataTransfer.effectAllowed = 'all';
      // 拖拽传递数据
      // https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types
      e.dataTransfer.setData('text/html', e.target.innerHTML);
      // 拖拽显示的图像
      e.dataTransfer.setDragImage(e.target, 0, 0);
      console.log('drag start');
      return true;
    },
    dragEndHandler(e) {
      e.dataTransfer.clearData();
      if (e.dataTransfer.dropEffect === 'copy') {
        this.$refs['content'].style.color = '#000';
      }
      return false;
    },
    dragEnterHandler(e) {
      this.$refs['content'].style.color = '#ff0000';
      e.preventDefault();
      return true;
    },
    dragLeaveHandler() {
      this.$refs['content'].style.color = '#000';
    },
    dragOverHandler(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return true;
    },
    dropHandler(e) {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/html');
      this.$refs['content'].innerHTML = data;
    },
  },
};
</script>
