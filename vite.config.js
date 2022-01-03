/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-11 18:58:28
 * @LastEditTime: 2022-01-01 15:42:30
 * @FilePath: \vite-project\vite.config.js
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EslintPlugin from 'vite-plugin-eslint';
import ViteSvgIcon from 'vite-plugin-svg-icons';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import styleImport from 'vite-plugin-style-import';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
import VueJsx from '@vitejs/plugin-vue-jsx';
const themeVariables = lessToJS(
  fs.readFileSync(resolve(__dirname, './src/theme/theme.less'), 'utf8'),
);

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/style/variables.scss';`,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
  plugins: [
    vue(),
    EslintPlugin(),
    VueJsx(),
    ViteSvgIcon({
      iconDirs: [resolve(__dirname, 'src/svg')],
      symbolId: 'icon-[name]',
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  build: {
    // 去除console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    fs: {
      allow: ['..'],
    },
  },
});
