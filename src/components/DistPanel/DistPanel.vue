<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 19:55:25
 * @LastEditTime: 2021-12-31 20:38:49
 * @FilePath: \vite-project\src\components\DistPanel\DistPanel.vue
-->
<template>
  <dot-wrapper :style="style" :anchors="['br']" @update="updateHandler">
    <div class="panel absolute flex flex-col" :style="convertStyle(style)">
      <div
        class="panel-header select-none cursor-move border border-gray bg-primary rounded-t-md flex items-center justify-between p-2"
        @pointerdown.stop.prevent="pointerDown"
        @pointerup="pointerUp"
      >
        <div class="text-default">{{ title }}</div>
        <svg-icon
          name="close-btn"
          class="text-default cursor-pointer"
          @click.stop.prevent="closeHandler"
        ></svg-icon>
      </div>
      <div ref="contentRef" class="flex-1 p-2 bg-default border border-gray rounded-b-md"></div>
    </div>
  </dot-wrapper>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { createCompApp } from '@/utils/widget';
import DotWrapper from './DotWrapper.vue';
import { transformUnit, computedPx } from '@/utils';
import { debounce } from 'lodash';
import SvgIcon from '../SvgIcon/SvgIcon.vue';
export default {
  name: 'DistPanel',
  components: { DotWrapper, SvgIcon },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    component: {
      required: true,
      type: Function,
    },
    meta: {
      type: Object,
      default: () => {},
    },
    mixinProps: {
      type: Object,
      default: () => {},
    },
    container: {
      type: [String, Element],
      default: '',
    },
    closeHandler: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      compVM: null,
      style: {
        width: 400,
        height: 300,
        top: 0,
        left: 0,
      },
      parentWidth: 400,
      parentHeight: 300,
      parent: null,
    };
  },
  created() {
    for (const key in this.meta) {
      this.style[key] = computedPx(this.meta[key] || this.style[key]);
    }
  },
  mounted() {
    this.parent = this.$parent ? this.$parent : document.querySelector(this.container);
    this.computeBoundRect();
    this.addComponent();
  },
  beforeUnmount() {
    this.parent = null;
  },
  methods: {
    convertStyle(obj) {
      const style = {};
      for (let i in obj) {
        style[i] = transformUnit(obj[i]);
      }
      return style;
    },
    computeBoundRect() {
      const { width, height } = this.parent.getBoundingClientRect();
      if (!width) {
        console.warn(`面板${this.name}父级容器未指定宽度！`);
      }
      if (!height) {
        console.warn(`面板${this.name}父级容器未指定高度！`);
      }
      width && (this.parentWidth = width);
      height && (this.parentHeight = height);
    },
    addComponent() {
      const content = this.$refs['contentRef'];
      const app = createCompApp(defineAsyncComponent(this.component), this.mixinProps);
      this.compVM = app.mount(content);
    },
    pointerDown(startEvt) {
      startEvt.target.setPointerCapture(startEvt.pointerId);
      const pm = debounce(pointermove, 5, { leading: true });
      const { top, left, width, height } = JSON.parse(JSON.stringify(this.style));
      const vm = this;
      function pointerup() {
        document.removeEventListener('pointermove', pm);
        document.removeEventListener('pointerup', pointerup);
        pm.cancel();
      }
      function pointermove(endEvt) {
        const xOffset = endEvt.clientX - startEvt.clientX;
        const yOffset = endEvt.clientY - startEvt.clientY;
        vm.updateHandler({
          top: top + yOffset,
          left: left + xOffset,
          width,
          height,
        });
      }
      document.addEventListener('pointermove', pm);
      document.addEventListener('pointerup', pointerup);
    },
    pointerUp(evt) {
      evt.target.releasePointerCapture(evt.pointerId);
    },
    limitParentBox(style = {}, maxWidth = this.parentWidth, maxHeight = this.parentHeight) {
      const { width, left, top, height } = style;
      if (top < 0) {
        style.top = 0;
        style.height = this.style.height;
      }
      if (left < 0) {
        style.left = 0;
        style.width = this.style.width;
      }
      if (left + width > maxWidth) {
        style.left = this.style.left;
        style.width = this.style.width;
      }
      if (top + height > maxHeight) {
        style.top = this.style.top;
        style.height = this.style.height;
      }
    },
    updateHandler(style) {
      this.limitParentBox(style);
      this.style = style;
    },
  },
};
</script>
