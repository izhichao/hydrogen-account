<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="统计"></Header>

    <div class="card-list">
      <ChartCard
        title="分类统计"
        :amount="monthExpend"
        @more="router.push({ name: 'Chart', query: { type: 'category', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        :title="`${month}月支出`"
        :amount="monthExpend"
        @more="router.push({ name: 'Chart', query: { type: 'day', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        :title="`${year}年支出`"
        :amount="yearExpend"
        @more="router.push({ name: 'Chart', query: { type: 'month', time: `${year}` } })"
      ></ChartCard>
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
import { useDealStore } from '../store/useDealStore';
import { useTime } from '../composables/useTime';
const { dealListGroup } = useDealStore();
const { now } = useTime();
const { year, month, monthStr } = now();
const router = useRouter();

const monthExpend = dealListGroup('month', { time: `${year}-${monthStr}` })[0]?.total || 0;
const yearExpend = dealListGroup('year', { time: `${year}` })[0]?.total || 0;
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
