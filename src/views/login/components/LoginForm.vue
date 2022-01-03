<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 23:39:10
 * @LastEditTime: 2022-01-01 01:02:43
 * @FilePath: \vite-project\src\views\login\components\LoginForm.vue
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    class="bg-light px-[2rem] py-[3rem] text-default mt-[10%] h-[40%]"
  >
    <a-form-item label="用户名" name="username" :label-col="{ span: 6 }" class="text-default">
      <a-input v-model:value="formState.username" placeholder="请输入用户名"> </a-input>
    </a-form-item>
    <a-form-item label="密码" name="password" :label-col="{ span: 6 }">
      <a-input-password v-model:value="formState.password" placeholder="请输入密码">
      </a-input-password>
    </a-form-item>
    <div class="justify-between flex mb-5">
      <a href="javascript:;">开始注册</a>
      <a href="javascript:;">忘记密码</a>
    </div>
    <a-form-item>
      <a-button type="primary" block @click.prevent="onSubmit">开始探索</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      formState: {
        username: '',
        password: '',
        code: '',
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'change',
            message: '请输入用户名',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'change',
            message: '请输入密码',
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      const bool = await this.$refs['formRef'].validate();
      if (bool) {
        this.$message.success('登录成功！');
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
