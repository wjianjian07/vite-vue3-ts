<script setup lang="ts">
import { ref, reactive, onMounted, defineComponent } from "vue";
import treeEcharts from './echarts/treeEcharts.vue'
defineComponent(() => {
  treeEcharts
})

onMounted(() => {

})
</script>

<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <el-button type="primary" size="small"></el-button>
    <!-- <treeEcharts></treeEcharts> -->
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import './assets/skin/handle.scss';
</style>

<style lang="scss">

</style>
