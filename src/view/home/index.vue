<script setup lang="ts">
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="home">
    aaaa
    <p class="title">aaa</p>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 500px;
  height: 200px;
  color: #ccc;

  .title {
    padding: 20px;
    background: blue;
  }
}
</style>
