/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 22:06:43
 * @LastEditTime: 2022-01-03 19:51:37
 * @FilePath: \vite-project\.eslintrc.js
 */
module.exports = {
  root: true,
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
  plugins: ['vue'],
  // rules in [!规则列表](https://eslint.org/docs/rules/)
  rules: {
    'no-var': 'error',
    'no-debugger': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Login', 'Demo', 'Portal'],
      },
    ],
  },
};
