<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <ChartCard :title="title" :amount="expends" :more="false"></ChartCard>
      <Card :header="false" class="padding-small">
        <ListItem :item="{ id: 1, name: '购物', desc: '10笔', amount: -100 }"></ListItem>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { useRoute } from 'vue-router';
import { useDealStore } from '../store/useDealStore';
import { ref } from 'vue';
const route = useRoute();
const { dealListGroup } = useDealStore();

const { type, time } = route.query;

const title = ref('分类统计');
if (type === 'month') {
  let [year, month] = time?.toString().split('-') as string[];
  if (year === new Date().getFullYear().toString()) {
    month = (+month).toString();
    title.value = `${month}月支出`;
  } else {
    title.value = `${year}年${month}月支出`;
  }
} else if (type === 'year') {
  title.value = `${time}年支出`;
}

const expends = dealListGroup(time?.length === 4 ? 'year' : 'month', time as string)[0].total;
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';
</style>
