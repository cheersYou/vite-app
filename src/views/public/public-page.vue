<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-12 17:33:43
 * @LastEditTime: 2021-12-30 13:55:49
 * @FilePath: \vite-project\src\views\public\public-page.vue
-->
<template>
  <div>public</div>
  <a-button type="primary">测试</a-button>
</template>

<script>
import { defineComponent, inject } from 'vue';
export default defineComponent({
  mounted() {
    const message = inject('$message');
    message && message.info('测试');
  },
});
</script>
