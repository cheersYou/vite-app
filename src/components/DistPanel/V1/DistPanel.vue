<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 19:55:25
 * @LastEditTime: 2021-12-31 17:48:47
 * @FilePath: \vite-project\src\components\DistPanel\DistPanel.vue
-->
<template>
  <dot-wrapper
    :style="style"
    :max-width="parentWidth"
    :max-height="parentHeight"
    @update="updateHandler"
  >
    <div class="panel absolute border-2 border-warning" :style="convertStyle(style)">
      <div
        ref="headerRef"
        class="panel-header cursor-move"
        @pointerdown.stop.prevent="mouseDownHandler"
        @pointerup="mouseUpHandler"
      >
        <div>{{ title }}</div>
      </div>
      <div ref="contentRef"></div>
      <div>Panel Footer</div>
    </div>
  </dot-wrapper>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { createCompApp } from '@/utils/widget';
import DotWrapper from './DotWrapper.vue';
import { transformUnit, computedPx } from '@/utils';
import { debounce } from 'lodash';
export default {
  name: 'DistPanel',
  components: { DotWrapper },
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
  },
  data() {
    return {
      compVM: null,
      clientX: 0,
      clientY: 0,
      style: {
        width: this.meta.width || 200,
        height: this.meta.height || 300,
        top: this.meta.top || 0,
        left: this.meta.left || 0,
      },
      parentWidth: 400,
      parentHeight: 600,
      debounceMoveFn: debounce(this.pointermove, 5, { leading: true }),
    };
  },
  created() {
    for (const key in this.style) {
      this.style[key] = computedPx(this.style[key]);
    }
  },
  mounted() {
    this.computeBoundRect();
    this.addComponent();
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
      const parent = this.$parent ? this.$parent : document.querySelector(this.container);
      const { width, height } = parent.getBoundingClientRect();
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
    mouseDownHandler(evt) {
      this.$el.setPointerCapture(evt.pointerId);
      // 开始的起点
      const { clientX, clientY } = evt;
      const [x = 0, y = 0] =
        this.$el.style.transform.replace('translate3d', '').match(/[-]?\d+[.]?(\d+)?/g) || [];
      this.clientX = clientX - Number(x);
      this.clientY = clientY - Number(y);
      const vm = this;
      function pointerup() {
        document.removeEventListener('pointermove', vm.debounceMoveFn);
        document.removeEventListener('pointerup', pointerup);
        const event = document.createEvent('HTMLEvents');
        event.pointerId = evt.pointerId;
        event.initEvent('pointerup', false, true);
        vm.$refs['headerRef'].dispatchEvent(event);
      }
      document.addEventListener('pointermove', this.debounceMoveFn);
      document.addEventListener('pointerup', pointerup);
    },
    pointermove(evt) {
      const { clientX, clientY } = evt;
      const xOffset = clientX - this.clientX;
      const yOffset = clientY - this.clientY;
      this.$el.style.transform = `translate3d(${xOffset}px,${yOffset}px,0)`;
    },
    mouseUpHandler(evt) {
      this.$el.releasePointerCapture(evt.pointerId);
    },
    updateHandler(style) {
      this.style = style;
    },
  },
};
</script>
