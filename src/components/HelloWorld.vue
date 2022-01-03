<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 18:58:28
 * @LastEditTime: 2021-12-31 20:46:34
 * @FilePath: \vite-project\src\components\HelloWorld.vue
-->
<script setup>
import { mergeWidget } from '@/utils/widget';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
defineProps({
  msg: String,
});

const count = ref(0);
onMounted(async () => {
  const store = useStore();
  const widgets = [
    {
      name: 'message-box',
    },
  ];
  const name = 'message-box';
  const widgetsMap = mergeWidget(widgets);
  store.dispatch('widget/initWidget', widgetsMap);
  await store.dispatch('widget/openWidget', name);
  // store.dispatch('widget/closeAllWidget');
});
</script>

<template>
  <h1 class="m-6">{{ msg }}</h1>
  <div class="container1 bg-primary">
    <button @click="count++">点击</button>
    <div class="show-msg">{{ count }}</div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: #42b983;
}
.container1 {
  background: #aaa;
  border: 1px solid #000;
  .show-msg {
    color: red;
  }
}
</style>
