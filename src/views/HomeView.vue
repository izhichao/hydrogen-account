<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="首页">
      <span class="header__search iconfont">&#xe623;</span>
    </Header>
    <div class="cardList">
      <ChartCard title="日趋势"></ChartCard>
      <ListCard title="最近交易" :list="recentDealList"></ListCard>
      <ListCard title="所有账户" :list="accountList"></ListCard>
    </div>
  </div>
  <var-button class="btn" type="primary" size="large" round @click="handlePop">
    <var-icon name="plus" :size="26" />
  </var-button>
  <Calculator v-model:show="calcStatus"></Calculator>
  <Docker :currentIndex="0"></Docker>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import ListCard, { Deal } from '../components/ListCard.vue';
import Circle from '../components/Circle.vue';
import Docker from '../components/Docker.vue';
import Calculator from '../components/Calculator.vue';
import { ref } from 'vue';

const recentDealList: Deal[] = [
  { id: 0, title: '购物', desc: '手机壳', amount: -4.58 },
  { id: 1, title: '购物', desc: '手机壳', amount: -4.58 },
  { id: 2, title: '购物', amount: -4.58 }
];

const accountList: Deal[] = [
  { id: 0, title: '支付宝', amount: 5000 },
  { id: 1, title: '微信', amount: 5000 }
];

const calcStatus = ref(false);
const handlePop = () => {
  calcStatus.value = true;
};
</script>

<style lang="less" scoped>
@import '../style/variables.less';

.header {
  &__search {
    font-size: 20px;
  }
}

.btn {
  position: absolute;
  background-color: @themeColor;
  height: 40px;
  width: 40px;
  right: 25px;
  bottom: 75px;
}
</style>
