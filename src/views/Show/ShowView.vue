<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="统计"></Header>

    <div class="card-list">
      <Card v-if="![show.category, show.day, show.month, show.year].includes(true)" :header="false" class="none">
        还没有图表，赶快去添加吧！
      </Card>
      <ChartCard
        v-if="show.category"
        title="分类统计"
        :amount="monthExpend"
        :option="categoryOptions(`${year}-${monthStr}`)"
        @more="router.push({ name: 'Chart', query: { type: 'category', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        v-if="show.day"
        :title="`${month}月支出`"
        :amount="monthExpend"
        :option="dayOptions(`${year}-${monthStr}`)"
        @more="router.push({ name: 'Chart', query: { type: 'day', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        v-if="show.month"
        :title="`${year}年支出`"
        :amount="yearExpend"
        :option="monthOptions(`${year}`)"
        @more="router.push({ name: 'Chart', query: { type: 'month', time: `${year}` } })"
      ></ChartCard>
      <ChartCard
        v-if="show.year"
        :title="`全部支出`"
        :amount="totalExpend"
        :option="yearOptions()"
        @more="router.push({ name: 'Chart', query: { type: 'year' } })"
      ></ChartCard>
    </div>
  </div>
  <Docker :currentIndex="1"></Docker>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Circle from '../../components/Circle.vue';
import Header from '../../components/Header.vue';
import ChartCard from '../../components/ChartCard.vue';
import Card from '../../components/Card.vue';
import Docker from '../../components/Docker.vue';
import { useChart } from '../../composables/useChart';
import { useDealStore } from '../../store/useDealStore';
import { useConfigStore } from '../../store/useConfigStore';
import getNow from '../../utils/getNow';
const router = useRouter();

// 设置是否显示图表
const configStore = useConfigStore();
const { show } = storeToRefs(configStore);

// 获取图表options
const { categoryOptions, dayOptions, monthOptions, yearOptions } = useChart();

// 获取各时间支出
const { year, month, monthStr } = getNow();
const { totalExpend, dealListGroup } = useDealStore();
const monthExpend = dealListGroup('month', { time: `${year}-${monthStr}` })[0]?.total || 0;
const yearExpend = dealListGroup('year', { time: `${year}` })[0]?.total || 0;
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}

.none {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
</style>
