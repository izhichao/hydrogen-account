<template>
  <Card>
    <div class="amount">{{ amount }}</div>
    <div class="chart" ref="chartRef"></div>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Card from './Card.vue';
import * as echarts from 'echarts';
const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  option: {
    type: Object,
    default: () => ({})
  }
});
const chartRef = ref();

onMounted(() => {
  const chart = echarts.init(chartRef.value);

  watch(
    () => props.option,
    () => {
      chart.setOption(props.option, { notMerge: true });
    },
    { immediate: true }
  );

  window.addEventListener('resize', () => {
    chart.resize();
  });
});
</script>

<style lang="less" scoped>

.amount {
  font-size: 20px;
  font-weight: 700;
  color: var(--themeRedColor);
  margin-bottom: 5px;
}

.chart {
  width: 315px;
  height: 120px;
}
</style>
