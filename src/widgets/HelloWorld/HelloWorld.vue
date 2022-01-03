<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-29 15:36:08
 * @LastEditTime: 2021-12-31 20:47:20
 * @FilePath: \vite-project\src\widgets\HelloWorld\HelloWorld.vue
-->
<template>
  <div ref="message">Hello World</div>
  <div @on-message="messageHandler">{{ name }}</div>
  <public-page></public-page>
  <svg-icon name="add-btn"></svg-icon>
  <hello-tt></hello-tt>
</template>

<script>
import PublicPage from '@/views/public/public-page.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'HelloWorld',
  components: {
    PublicPage,
  },
  inject: ['$message'],
  props: {
    name: String,
    config: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['on-message'],
  setup() {
    const store = useStore();
    console.log(store.getters['widget/widgetMap']);
    const route = useRoute();
    console.log(route);
  },
  data() {
    return {};
  },
  mounted() {
    this.$message.warn('测试时');
    console.log(this.config);
  },
  methods: {
    messageHandler(data) {
      console.log(data);
    },
  },
};
</script>
