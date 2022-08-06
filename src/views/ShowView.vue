<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="统计"></Header>

    <div class="card-list">
      <ChartCard
        title="分类统计"
        :amount="monthExpend"
        @more="router.push({ name: 'Chart', query: { type: 'category', time: `${year}-${monthPad}` } })"
      ></ChartCard>
      <ChartCard
        :title="`${month}月支出`"
        :amount="monthExpend"
        @more="router.push({ name: 'Chart', query: { type: 'month', time: `${year}-${monthPad}` } })"
      ></ChartCard>
      <ChartCard
        :title="`${year}年支出`"
        :amount="yearExpend"
        @more="router.push({ name: 'Chart', query: { type: 'year', time: `${year}` } })"
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

const { dealListGroup } = useDealStore();

const router = useRouter();
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const monthPad = (date.getMonth() + 1).toString().padStart(2, '0');
const monthExpend = dealListGroup('month', `${year}-${monthPad}`)[0].total;
const yearExpend = dealListGroup('year', `${year}`)[0].total;
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
