<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 18:58:28
 * @LastEditTime: 2022-01-01 16:35:14
 * @FilePath: \vite-project\src\App.vue
-->
<template>
  <router-view v-if="isSelfRoute"></router-view>
  <Layout v-else></Layout>
</template>

<script setup>
import Layout from '@/Layout';
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const isSelfRoute = computed(() => store.getters['app/curRoute']);
</script>
<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
