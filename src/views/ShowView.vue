<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="统计"></Header>

    <div class="card-list">
      <ChartCard title="分类统计" @more="router.push({ name: 'Chart', query: { type: 'category', month } })"></ChartCard>
      <ChartCard :title="`${month}月支出`" @more="router.push({ name: 'Chart', query: { type: 'month', month } })"></ChartCard>
      <ChartCard :title="`${year}年支出`" @more="router.push({ name: 'Chart', query: { type: 'year', year } })"></ChartCard>
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
const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
