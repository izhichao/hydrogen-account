<template>
  <Circle></Circle>

  <div class="main-content">
    <div class="month">1</div>

    <div class="recent">2</div>
  </div>
  <Docker :currentIndex="0"></Docker>
</template>

<script lang="ts" setup>
import Circle from '../../components/Circle.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped></style>
