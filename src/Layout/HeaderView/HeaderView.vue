<!--
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2021-12-31 20:51:40
 * @LastEditTime: 2022-01-01 16:39:56
 * @FilePath: \vite-project\src\Layout\HeaderView\HeaderView.vue
-->
<template>
  <div class="header bg-default flex justify-between items-center drop-shadow-sm px-4">
    <a-breadcrumb>
      <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ curSys }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div>
      <a-dropdown placement="topCenter">
        <div class="cursor-pointer" @click.prevent>
          {{ curSys }}
          <DownOutlined />
        </div>
        <template #overlay>
          <a-menu @click="menuClick">
            <a-menu-item v-for="(app, index) in apps" :key="index" :title="app.title">
              <a href="javascript:;">{{ app.title }}</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div>
      <svg-icon name="bingo"></svg-icon>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '我的系统',
    },
    apps: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      curSys: '',
    };
  },
  created() {
    if (this.apps?.[0]?.title) {
      this.curSys = this.apps[0].title;
      this.menuClick({ item: this.apps[0] });
    }
  },
  mounted() {},
  methods: {
    menuClick({ item }) {
      const app = this.apps.find((i) => {
        return i.title === item.title;
      });
      this.curSys = item.title;
      this.$router.push(app.activeRule);
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  height: 3rem;
}
</style>
