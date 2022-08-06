<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <ChartCard :title="title" :amount="expends" :more="false"></ChartCard>
      <Card :header="false" v-for="item in list" class="padding-small">
        <ListItem
          :item="item"
          @click="router.push({ name: 'List', query: { type: 'deal', keyword: item.name } })"
        ></ListItem>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { useDealStore } from '../store/useDealStore';
import { ref } from 'vue';
import { DealStats } from '../types/deal';
const route = useRoute();
const router = useRouter();
const { dealListGroup } = useDealStore();

const { type, time } = route.query;
const typeStr = type?.toString() as string;
let timeStr = time?.toString() as string;
const list: DealStats[] = [];

const handleStatsList = () => {
  let id = 0;
  dealListGroup(typeStr, timeStr).forEach((item) => {
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
  let [year, month] = timeStr.split('-') as string[];
  handleStatsList();
  month = (+month).toString();
  if (year === new Date().getFullYear().toString()) {
    title.value = `${month}月支出`;
  } else {
    title.value = `${year}年${month}月支出`;
  }
} else if (type === 'month') {
  title.value = `${time}年支出`;
  handleStatsList();
} else {
  handleStatsList();
}

const expends = dealListGroup(time?.length === 4 ? 'year' : 'month', timeStr)[0]?.total || 0;
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';
</style>
