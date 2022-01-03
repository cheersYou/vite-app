<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 22:35:05
 * @LastEditTime: 2021-12-31 22:54:37
 * @FilePath: \vite-project\src\Layout\LeftRight\LeftRight.vue
-->
<template>
  <div class="w-full h-full flex">
    <div :style="{ width: width }">
      <slot name="left"></slot>
    </div>
    <div class="flex-1">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '20%',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
