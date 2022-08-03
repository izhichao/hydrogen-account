<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="首页">
      <span class="header__search iconfont">&#xe623;</span>
    </Header>
    <div class="card-list">
      <ChartCard title="日趋势" @more="router.push({ name: 'Chart', query: { type: 'day' } })"></ChartCard>
      <Card title="最近交易" @more="router.push({ name: 'List', query: { type: 'deal' } })">
        <ul class="list">
          <ListItem
            v-for="item in recentDealList"
            :key="item.id"
            :item="item"
            @more="router.push({ name: 'Detail', query: { type: 'edit', id: item.id } })"
          ></ListItem>
        </ul>
      </Card>
      <Card title="所有账户" @more="router.push({ name: 'List', query: { type: 'account' } })">
        <ul class="list">
          <ListItem v-for="item in accountList" :key="item.id" :item="item"></ListItem>
        </ul>
      </Card>
    </div>
  </div>
  <var-button class="btn" type="primary" size="large" round @click="router.push({ name: 'Detail', query: { type: 'add' } })">
    <var-icon name="plus" :size="26" />
  </var-button>
  <Calculator v-model:show="calcStatus"></Calculator>
  <Docker :currentIndex="0"></Docker>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Circle from '../components/Circle.vue';
import Docker from '../components/Docker.vue';
import ChartCard from '../components/ChartCard.vue';
import Card from '../components/Card.vue';
import ListItem, { Item } from '../components/ListItem.vue';
import Calculator from '../components/Calculator.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '../store/useAccountStore';
import { useDealStore } from '../store/useDealStore';

const router = useRouter();

const { accountList } = useAccountStore();
const { recentDealList } = useDealStore();

const calcStatus = ref(false);
const handlePop = () => {
  // calcStatus.value = true;
  router.push({ name: 'Detail' });
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
