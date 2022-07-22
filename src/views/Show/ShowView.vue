<template>
  <div class="main-content">
    <Circle></Circle>
    <div class="header"></div>

    <div class="cardList">
      <ChartCard title="分类统计"></ChartCard>
      <ChartCard title="日趋势"></ChartCard>
      <ChartCard title="月趋势"></ChartCard>
    </div>
  </div>
  <Docker :currentIndex="1"></Docker>
</template>

<script lang="ts" setup>
import Circle from '../../components/Circle.vue';
import ChartCard from '../../components/ChartCard.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
