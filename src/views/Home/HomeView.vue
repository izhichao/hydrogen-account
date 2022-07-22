<template>
  <div class="main-content">
    <Circle></Circle>
    <div class="header"></div>

    <div class="cardList">
      <ChartCard title="日趋势"></ChartCard>
      <ListCard title="最近交易" :list="recentDealList"></ListCard>
      <ListCard title="所有账户" :list="accountList"></ListCard>
    </div>
  </div>
  <Docker :currentIndex="0"></Docker>
</template>

<script lang="ts" setup>
import ChartCard from '../../components/ChartCard.vue';
import ListCard, { Deal } from '../../components/ListCard.vue';
import Circle from '../../components/Circle.vue';
import Docker from '../../components/Docker.vue';

const recentDealList: Deal[] = [
  { id: 0, title: '购物', desc: '手机壳', amount: -4.58 },
  { id: 1, title: '购物', desc: '手机壳', amount: -4.58 },
  { id: 2, title: '购物', amount: -4.58 }
];

const accountList: Deal[] = [
  { id: 0, title: '支付宝', amount: 5000 },
  { id: 1, title: '微信', amount: 5000 },
]
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
