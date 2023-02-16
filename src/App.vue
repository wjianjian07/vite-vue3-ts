<script setup lang="ts">
import treeEcharts from './echarts/treeEcharts.vue'
defineComponent(() => {
  treeEcharts
})

// const loading = ref(true)

onMounted(() => {

})
</script>

<template>
  <div id="app" class="app-panel">
    <!-- <treeEcharts></treeEcharts> -->
    <routerView class="bda-ui" />
  </div>
</template>

<style lang="scss" scoped>
::v-deep(#app) {
  .bda-ui {
    overflow: hidden;
    height: 100%;
  }
}
</style>

<style lang="scss">
@import './assets/skin/handle.scss';

#app {
  height: 100%;
  width: 100%;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  font: 12px "PingFang SC", "Source Han Sans CN", "Microsoft YaHei", "Arial Narrow", HELVETICA, sans-serif;
  overflow: hidden;
  /* font-family: Microsoft YaHei,Helvetica,Tahoma,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif; */
}

body {
  @include background_color("main_panel_background_color");
}

.zZindex {
  z-index: 3000 !important;
}

.el-message {
  z-index: 3000 !important;
}

.app-panel {
  @include font_color("main_text_color");
}
</style>
