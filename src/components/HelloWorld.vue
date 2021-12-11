<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description: 
 * @Date: 2021-12-11 18:58:28
 * @LastEditTime: 2021-12-11 23:38:04
 * @FilePath: \vite-project\src\components\HelloWorld.vue
-->
<script setup>
import { ref } from 'vue';
defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="container">
    <button @click="count++">点击</button>
    <div class="show-msg">
      {{ count }}
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: #42b983;
}
.container {
  background: #aaa;
  border: 1px solid #000;
  .show-msg {
    color: red;
  }
}
</style>
