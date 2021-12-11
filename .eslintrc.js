/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 22:06:43
 * @LastEditTime: 2021-12-11 23:27:14
 * @FilePath: \vite-project\.eslintrc.js
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: ['vue', 'prettier'],
  // rules in [!规则列表](https://eslint.org/docs/rules/)
  rules: {
    'no-var': 'error',
    'prettier/prettier': 'error',
  },
};
