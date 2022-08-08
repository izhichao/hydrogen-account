<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="首页">
      <template #center>
        <input type="text" class="header__input" v-model="keyword" ref="addInput" />
      </template>
      <template #right>
        <span class="header__search iconfont" @click="handleSearch">&#xe623;</span>
      </template>
    </Header>
    <div class="card-list">
      <ChartCard
        :title="`${month}月支出`"
        :amount="monthExpend"
        @more="router.push({ name: 'Chart', query: { type: 'day', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <Card title="最近交易" @more="router.push({ name: 'List', query: { list: 'deal' } })">
        <ul class="list">
          <ListItem
            v-for="item in recentDealList"
            :key="item.id"
            :item="item"
            @more="router.push({ name: 'Detail', query: { type: 'edit', id: item.id } })"
          ></ListItem>
        </ul>
      </Card>
      <Card title="所有账户" @more="router.push({ name: 'List', query: { list: 'account' } })">
        <ul class="list">
          <ListItem v-for="item in accountList" :key="item.id" :item="item"></ListItem>
        </ul>
      </Card>
    </div>
  </div>
  <var-button
    class="btn"
    type="primary"
    size="large"
    round
    @click="router.push({ name: 'Detail', query: { type: 'add' } })"
  >
    <var-icon name="plus" :size="26" />
  </var-button>
  <Calculator v-model:show="calcStatus"></Calculator>
  <Docker :currentIndex="0"></Docker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Circle from '../components/Circle.vue';
import Docker from '../components/Docker.vue';
import ChartCard from '../components/ChartCard.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import Calculator from '../components/Calculator.vue';
import { useAccountStore } from '../store/useAccountStore';
import { useDealStore } from '../store/useDealStore';
import { useTime } from '../composables/useTime';

const router = useRouter();
const { accountList } = useAccountStore();
const { dealListGroup, recentDealList } = useDealStore();

const { now } = useTime();
const { year, month, monthStr } = now();

const monthExpend = dealListGroup('month', { time: `${year}-${monthStr}` })[0].total;

const calcStatus = ref(false);
const searchStatus = ref(false);
const keyword = ref('');
const addInput = ref();
const handlePop = () => {
  // calcStatus.value = true;
  router.push({ name: 'Detail' });
};

const handleSearch = () => {
  if (searchStatus.value && keyword.value) {
    router.push({ name: 'List', query: { list: 'deal', keyword: keyword.value } });
  } else if (searchStatus.value) {
    addInput.value.style.opacity = 0;
    addInput.value.style.width = 0;
    addInput.value.style.padding = 0;
    searchStatus.value = false;
  } else {
    addInput.value.style.opacity = 0.9;
    addInput.value.style.width = '90%';
    addInput.value.style.padding = '0 15px';
    searchStatus.value = true;
  }
};
</script>

<style lang="less" scoped>
@import '../style/variables.less';

.header {
  :deep(&__center) {
    flex: 1;
  }

  &__input {
    box-sizing: border-box;
    display: block;
    width: 0;
    padding: 0;
    margin: 0 auto;
    height: 28px;
    border-radius: 16px;
    border: none;
    outline: none;
    font-size: 14px;
    transition: all 0.5s ease-out;
  }
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
