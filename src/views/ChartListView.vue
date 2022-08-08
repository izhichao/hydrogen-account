<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <ChartCard :title="title" :amount="expends" :more="false"></ChartCard>
      <Card :header="false" v-for="item in list" class="padding-small">
        <ListItem :item="item" @click="handlePush(item)"></ListItem>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { DealStats } from '../types/deal';
import { useDealStore } from '../store/useDealStore';
import { useTime } from '../composables/useTime';

const route = useRoute();
const router = useRouter();
const { dealListGroup } = useDealStore();
const { now } = useTime();

const { type, time } = route.query;
const list: DealStats[] = [];

const handleStatsList = () => {
  let id = 0;
  dealListGroup(type as string, { time: time as string }).forEach((item) => {
    list.push({
      id,
      name: item.name,
      desc: `${item.value.length}笔`,
      amount: item.total
    });
    id++;
  });
};

const title = ref('分类统计');
if (type === 'day') {
  let [year, month] = (time as string).split('-');
  handleStatsList();
  month = (+month).toString();
  if (year === now().yearStr) {
    // 今年只显示月份
    title.value = `${month}月支出`;
  } else {
    // 不是今年显示年、月
    title.value = `${year}年${month}月支出`;
  }
} else if (type === 'month') {
  title.value = `${time}年支出`;
  handleStatsList();
} else {
  handleStatsList();
}

const handlePush = (item: DealStats) => {
  if (type === 'category') {
    router.push({ name: 'List', query: { list: 'deal', time, keyword: item.name } });
  } else {
    router.push({ name: 'List', query: { list: 'deal', time: item.name } });
  }
};

const expends = dealListGroup(time?.length === 4 ? 'year' : 'month', { time: time as string })[0]?.total || 0;
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';
</style>
