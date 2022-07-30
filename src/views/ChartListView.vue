<template>
  <Header title="分类统计" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <ChartCard title="分类"></ChartCard>
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
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';
</style>
