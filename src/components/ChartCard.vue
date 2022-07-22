<template>
  <Card :title="title">
    <div class="price">-123.01</div>
    <div class="chart"></div>
  </Card>
</template>

<script lang="ts" setup>
import Card from './Card.vue';
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style lang="less" scoped>
.price {
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
