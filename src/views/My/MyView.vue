<template>
  <div class="main-content">
    <Circle></Circle>
    <div class="cardList">
    </div>
  </div>
  <Docker :currentIndex="2"></Docker>
</template>

<script lang="ts" setup>
import Circle from '../../components/Circle.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
.cardList {
  margin-top: 50px;
}
</style>
