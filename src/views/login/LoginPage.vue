<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 22:33:42
 * @LastEditTime: 2021-12-31 23:50:00
 * @FilePath: \vite-project\src\views\login\LoginPage.vue
-->
<template>
  <left-right width="70%">
    <template #left>
      <div class="w-full h-full bg-cover bg-no-repeat bg-login-bg" />
    </template>
    <template #right>
      <div class="w-full h-full bg-dark flex flex-col items-center text-default">
        <h1 class="text-default mt-[10%]">{{ title }}</h1>
        <login-form></login-form>
        <message-box></message-box>
      </div>
    </template>
  </left-right>
</template>

<script>
import LeftRight from '@/Layout/LeftRight';
import { defineComponent } from 'vue';
import LoginForm from './components/LoginForm.vue';
import MessageBox from './components/MessageBox.vue';
export default defineComponent({
  name: 'Login',
  components: {
    'left-right': LeftRight,
    LoginForm,
    MessageBox,
  },
  setup() {
    return {};
  },
  data() {
    return {
      title: this.$store.getters['app/config'].title,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.ant-form-item-label > label) {
  @apply text-default;
}
</style>
