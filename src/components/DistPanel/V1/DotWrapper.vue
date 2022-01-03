<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-30 21:37:52
 * @LastEditTime: 2021-12-31 17:49:05
 * @FilePath: \vite-project\src\components\DistPanel\DotWrapper.vue
-->
<template>
  <div class="dot-wrapper relative">
    <div
      v-for="(point, index) in anchors"
      :key="index"
      class="dot-wrapper-point absolute border border-primary bg-transparent"
      :class="[
        { '-ml-[5px]': point.includes('r') },
        {
          '-ml-[3px]': point.includes('l'),
        },
        { '-mt-[3px]': point.includes('t') },
        { '-mt-[5px]': point.includes('b') },
      ]"
      :style="getPointStyle(point)"
      @pointerdown.stop.prevent="pointerDown(point, $event)"
      @pointerup="pointerUp"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { transformUnit, computedPx } from '@/utils';
import { debounce } from 'lodash';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    style: {
      type: Object,
      default: () => {},
    },
    anchors: {
      type: Array,
      default: () => {
        return ['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l'];
      },
    },
    minWidth: {
      type: [Number, String],
      default: 40,
    },
    minHeight: {
      type: [Number, String],
      default: 40,
    },
    maxWidth: {
      type: Number,
      default: 400,
    },
    maxHeight: {
      type: Number,
      default: 600,
    },
  },
  emits: ['update'],
  data() {
    return {
      cursorMap: {
        tl: 'nw',
        t: 'ns',
        tr: 'ne',
        r: 'e',
        l: 'ew',
        br: 'se',
        b: 'n',
        bl: 'ne',
      },
    };
  },
  methods: {
    getPointStyle(point) {
      let { top, left } = this.style;
      const { width, height } = this.style;
      switch (point) {
        case 'tl':
        case 't':
        case 'tr':
          left =
            point.length === 1 ? left + width / 2 - 4 : point.includes('l') ? left : width + left;
          break;
        case 'r':
        case 'l':
          top = height / 2 + top - 4;
          left = point.includes('l') ? left : width + left;
          break;
        case 'br':
        case 'b':
        case 'bl':
          top = top + height;
          left =
            point.length === 1 ? left + width / 2 - 4 : point.includes('l') ? left : width + left;
          break;
      }
      return {
        top: transformUnit(top),
        left: transformUnit(left),
        cursor: this.cursorMap[point] + '-resize',
      };
    },
    pointerDown(point, startEvt) {
      const style = JSON.parse(JSON.stringify(this.style));
      startEvt.target.setPointerCapture(startEvt.pointerId);
      const pm = debounce(pointermove, 5, {
        leading: true,
      });
      const vm = this;
      function pointerup() {
        document.removeEventListener('pointermove', pm);
        document.removeEventListener('pointerup', pointerup);
      }
      function pointermove(endEvt) {
        vm.update(point, { style, startEvt, endEvt });
      }
      document.addEventListener('pointermove', pm);
      document.addEventListener('pointerup', pointerup);
    },
    pointerUp(evt) {
      evt.target.releasePointerCapture(evt.pointerId);
    },
    reverse(point, style) {
      let { top, left, width, height } = style;
      const w = () => {
        if (width < 0) {
          width = -width;
          left = left - width;
        }
      };
      const h = () => {
        if (height < 0) {
          height = -height;
          top = top - height;
        }
      };
      switch (point) {
        case 'tl':
        case 'tr':
        case 'br':
        case 'bl':
          w();
          h();
          break;
        case 't':
        case 'b':
          h();
          break;
        case 'r':
        case 'l':
          w();
          break;
      }
      return {
        width: width,
        height: height,
        top: top,
        left: left,
      };
    },
    parent(style = {}) {
      const { width, left, top, height } = style;
      if (top < 0) {
        style.top = 0;
        style.height = this.style.height;
      }
      if (left < 0) {
        style.left = 0;
        style.width = this.style.width;
      }
      if (left + width > this.maxWidth) {
        style.width = this.style.width;
        style.left = this.style.left;
      }
      if (top + height > this.maxHeight) {
        style.height = this.style.height;
        style.top = this.style.top;
      }
    },
    update(point, { style, startEvt, endEvt }) {
      // x偏移
      const xOffset = endEvt.clientX - startEvt.clientX;
      // y偏移
      const yOffset = endEvt.clientY - startEvt.clientY;
      let { width, height, top, left } = style;
      // 计算拖拽位置
      function match(point) {
        switch (point) {
          case 'r':
            width = width + xOffset;
            break;
          case 't':
            top = top + yOffset;
            height = height - yOffset;
            break;
          case 'b':
            height = height + yOffset;
            break;
          case 'l':
            left = left + xOffset;
            width = width - xOffset;
            break;
        }
      }
      for (let i = 0; i < point.length; i++) {
        match(point[i], i);
      }
      // 最小宽度和高度限制
      const minWidth = computedPx(this.minWidth);
      const minHeight = computedPx(this.minHeight);
      if (width < minWidth) {
        width = minWidth;
      }
      if (height < minHeight) {
        height = minHeight;
      }
      // 拖拽反转处理
      style = this.reverse(point, {
        width,
        height,
        top,
        left,
      });
      // 父级边界处理
      this.parent(style);
      this.$emit('update', style);
    },
  },
});
</script>

<style scoped lang="scss">
.dot-wrapper {
  &-point {
    width: 8px;
    height: 8px;
    z-index: 1;
  }
}
</style>
