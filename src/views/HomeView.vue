<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="首页">
      <template #center>
        <input type="text" class="header__input" v-model="keyword" ref="inputRef" />
      </template>
      <template #right>
        <span class="header__search iconfont" @click="handleSearch">&#xe623;</span>
      </template>
    </Header>
    <div class="card-list">
      <ChartCard
        :title="`${month}月支出`"
        :amount="monthExpend"
        :option="dayOptions(`${year}-${monthStr}`)"
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
          <ListItem v-for="item in accountList" :key="item.id" :item="item" @click="handleShowEdit(item.id)"></ListItem>
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
    <var-icon name="plus" class="btn__icon" />
  </var-button>
  <Calculator v-model:show="calcStatus"></Calculator>
  <Docker :currentIndex="0"></Docker>

  <var-dialog v-model:show="editAccountModel.status" @confirm="handleEdit">
    <var-input placeholder="请输入新的账户名" v-model="editAccountModel.name" />
    <var-input placeholder="请输入余额" type="number" v-model.number="editAccountModel.amount" />
    <var-button text outline type="primary" size="mini" @click="handleDelete">删除</var-button>
  </var-dialog>
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
import { useDealStore } from '../store/useDealStore';
import { useTime } from '../composables/useTime';
import { useAccount } from '../composables/useAccount';
import { useChart } from '../composables/useChart';

const router = useRouter();
const { accountList, editAccountModel, handleEdit, handleDelete, handleShowEdit } = useAccount();
const { dealListGroup, recentDealList } = useDealStore();
const { now } = useTime();
const { year, month, monthStr } = now();
const { dayOptions } = useChart();

const monthExpend = dealListGroup('month', { time: `${year}-${monthStr}` })[0].total;

const calcStatus = ref(false);
const searchStatus = ref(false);
const keyword = ref('');
const inputRef = ref();
const handlePop = () => {
  // calcStatus.value = true;
  router.push({ name: 'Detail' });
};

const handleSearch = () => {
  if (searchStatus.value && keyword.value) {
    router.push({ name: 'List', query: { list: 'deal', keyword: keyword.value } });
  } else if (searchStatus.value) {
    inputRef.value.style.opacity = 0;
    inputRef.value.style.width = 0;
    inputRef.value.style.padding = 0;
    searchStatus.value = false;
  } else {
    inputRef.value.style.opacity = 0.9;
    inputRef.value.style.width = '90%';
    inputRef.value.style.padding = '0 15px';
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

  &__icon {
    font-size: 26px;
  }
}
</style>
