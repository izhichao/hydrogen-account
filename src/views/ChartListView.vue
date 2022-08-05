<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <ChartCard :title="title" :more="false"></ChartCard>
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
import { ref } from 'vue';
const route = useRoute();
const { type, month, year } = route.query;

const title = ref('分类统计');
if (type === 'month') {
  title.value = `${month}月支出`;
} else if (type === 'year') {
  title.value = `${year}年支出`;
}
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';
</style>
