/*
 * @Author: Lauxb
 * @Date: 2021-02-26 10:19:55
 * @LastEditTime: 2021-12-31 23:31:53
 * @LastEditors: weicong
 * @Description: tailwind 配置
 */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    inset: {
      0: '0rem',
      1: '0.21rem',
      2: '0.42rem',
      3: '0.63rem',
      4: '0.84rem',
      5: '1.25rem',
    },
    // 响应设置
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024) { ... }

      xl: '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    fontSize: {
      xs: '0.73rem',
      sm: '0.83rem',
      base: '0.93rem',
      xl: '1.04rem',
      lg: '1.25rem',
      xxl: '1.67rem',
    },
    margin: {
      0: '0rem',
      1: '0.21rem',
      2: '0.42rem',
      3: '0.63rem',
      4: '0.84rem',
      5: '1.05rem',
      6: '1.26rem',
      '1/5': '20%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    padding: {
      0: '0rem',
      1: '0.21rem',
      2: '0.42rem',
      3: '0.63rem',
      4: '0.84rem',
      5: '1.05rem',
      6: '1.26rem',
      7: '1.47rem',
      8: '1.68rem',
      '1/5': '20%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    spacing: {
      0: '0rem',
      1: '0.21rem',
      2: '0.42rem',
      3: '0.63rem',
      4: '0.84rem',
      5: '1.05rem',
      6: '1.26rem',
    },
    colors: {
      transparent: 'transparent',
      default: '#ffffff',
      primary: '#1890FF',
      secondary: '#486AD8',
      thridary: '#D86F48',
      dark: '#323C57',
      gray: '#CACDD4',
      gradient: 'linear-gradient(#2e75fc, #6323ff)',
      success: '#099021',
      warning: '#ffcf26',
      error: '#ff554a',
      light: 'rgba(62, 117, 252, 0.1)',
      'neutral-5': '#7A85A5',
      'neutral-4': '#666D81',
      'neutral-3': '#323C57',
      'neutral-2': '#333333',
      'neutral-1': '#1d1d1d',
      'neutral-0': '#000000',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'primary-30': 'rgba(62, 117, 252, 0.03)',
    }),
    boxShadow: {
      default: '0rem 0rem 0.52rem 0.21rem rgba(0, 0, 0, 0.1)',
    },
    // 拓展覆盖原属性名称
    extend: {
      opacity: {
        0: '0',
        20: '0.2',
        40: '0.4',
        60: '0.6',
        80: '0.8',
        100: '1',
      },
      backgroundImage: {
        'login-bg': 'url("./src/assets/images.jpg")',
      },
    },
  },
  // 支持自定义类名及类内容详见 https://www.tailwindcss.cn/docs/plugins
  plugins: [],
  // 可以在此关闭你不想使用的类
  corePlugins: {
    container: false,
  },
};
