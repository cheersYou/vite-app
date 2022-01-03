<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 20:49:48
 * @LastEditTime: 2022-01-01 16:39:01
 * @FilePath: \vite-project\src\Layout\AppLayout.vue
-->
<template>
  <div class="w-full h-full flex flex-col">
    <HeaderView :title="title" :apps="apps"></HeaderView>
    <router-view v-if="isSelfRoute" class="flex-1"></router-view>
    <section v-else id="container" class="flex-1"></section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import HeaderView from './HeaderView/HeaderView.vue';
const store = useStore();
const config = store.getters['app/config'];
const title = config.title;
const apps = config.APPS;
const isSelfRoute = computed(() => store.getters['app/curRoute']);
</script>

<style scoped lang="scss"></style>
