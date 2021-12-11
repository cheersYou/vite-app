/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 18:58:28
 * @LastEditTime: 2021-12-11 23:48:05
 * @FilePath: \vite-project\vite.config.js
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [vue(), EslintPlugin()],
});
