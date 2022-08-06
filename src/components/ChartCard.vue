<template>
  <Card>
    <div class="amount">{{ amount }}</div>
    <div class="chart"></div>
  </Card>
</template>

<script lang="ts" setup>
import Card from './Card.vue';
defineProps({
  amount: {
    type: Number,
    required: true
  }
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
  height: 130px;
  background-color: #ccc;
}
</style>
