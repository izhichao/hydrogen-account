<template>
  <Header title="所有交易" :showBack="true"></Header>
  <div class="main-content">
    <Card :showHeader="false"></Card>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
</script>

<style lang="less" scoped>
@import '../style/variables.less';
.main-content {
  top: 50px;
  bottom: 0;
}
.header {
  padding: 0 25px;
  background-image: @linearColor;
}
</style>
