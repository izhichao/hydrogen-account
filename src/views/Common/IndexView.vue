<template>
  <div class="main-content">
    <div class="bg"></div>
    <router-view></router-view>
  </div>
  <Docker :currentIndex="index"></Docker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Docker from '../../components/Docker.vue';
const route = useRoute();
const index = ref(0);

switch (route.name) {
  case 'Home':
    index.value = 0;
    break;
  case 'Show':
    index.value = 1;
    break;
  case 'My':
    index.value = 2;
}
</script>

<style lang="less" scoped>
.bg {
  position: absolute;
  left: 50%;
  top: -350px;
  transform: translate(-50%);
  width: 800px;
  height: 500px;
  border-radius: 50%;
  background-image: linear-gradient(239deg, #3a6ff3, #50c7fb);
  z-index: -999;
}
</style>
