<template>
  <Header title="分类" :showBack="true"></Header>
  <div class="main-content">
    
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
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
