<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 13:19:36
 * @LastEditTime: 2021-12-31 18:55:57
 * @FilePath: \vite-project\src\components\SvgIcon\SvgIcon.vue
-->

<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :href="symbolId" />
  </svg>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '1em',
    },
    height: {
      type: String,
      default: '1em',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return {
      symbolId,
    };
  },
});
</script>

<style lang="scss" scoped>
svg {
  fill: currentColor;
}
</style>
