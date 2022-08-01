<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="统计"></Header>

    <div class="card-list">
      <ChartCard title="分类统计" @more="router.push({ name: 'Chart', query: { type: 'category' } })"></ChartCard>
      <ChartCard title="日趋势" @more="router.push({ name: 'Chart', query: { type: 'day' } })"></ChartCard>
      <ChartCard title="月趋势" @more="router.push({ name: 'Chart', query: { type: 'month' } })"></ChartCard>
    </div>
  </div>
  <Docker :currentIndex="1"></Docker>
</template>

<script lang="ts" setup>
import Circle from '../components/Circle.vue';
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import Docker from '../components/Docker.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
