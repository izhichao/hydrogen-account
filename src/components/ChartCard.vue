<template>
  <Card>
    <div class="amount">{{ amount }}</div>
    <div class="chart" ref="chartRef"></div>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
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
  chart.setOption(props.option);
});
</script>

<style lang="less" scoped>
.amount {
  font-size: 20px;
  font-weight: 700;
  color: #ff6c7a;
  margin-bottom: 5px;
}

.chart {
  width: 100%;
  height: 120px;
}
</style>
