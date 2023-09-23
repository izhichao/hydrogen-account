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
        :amount="monthExpense"
        :option="categoryOptions(`${year}-${monthStr}`)"
        @more="router.push({ name: 'Chart', query: { type: 'category', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        v-if="show.day"
        :title="`${month}月支出`"
        :amount="monthExpense"
        :option="dayOptions(`${year}-${monthStr}`)"
        @more="router.push({ name: 'Chart', query: { type: 'day', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        v-if="show.month"
        :title="`${year}年支出`"
        :amount="yearExpense"
        :option="monthOptions(`${year}`)"
        @more="router.push({ name: 'Chart', query: { type: 'month', time: `${year}` } })"
      ></ChartCard>
      <ChartCard
        v-if="show.year"
        :title="`全部支出`"
        :amount="totalExpense"
        :option="yearOptions()"
        @more="router.push({ name: 'Chart', query: { type: 'year' } })"
      ></ChartCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
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
const { totalExpense, dealListGroup } = useDealStore();
const monthExpense = dealListGroup('month', { time: `${year}-${monthStr}`, type: 'out' })[0]?.total || 0;
const yearExpense = dealListGroup('year', { time: `${year}`, type: 'out' })[0]?.total || 0;
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
