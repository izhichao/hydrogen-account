<template>
  <Header title="分类统计" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <ChartCard title="分类"></ChartCard>
      <Card :header="false" class="card-item">
        <ListItem :item="{ id: 1, title: '购物', desc: '10笔', amount: -100 }"></ListItem>
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
.main-content {
  top: 50px;
  bottom: 0;
}
.header {
  padding: 0 20px;
  background-image: @linearColor;
}

.card-list {
  padding-top: 10px;
}

.card-item {
  padding: 10px 15px;
}
</style>
