<template>
  <Header title="所有交易" :showBack="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :showHeader="false">
        <ul>
          <li class="top">
            <div class="top__title">交易数</div>
            <div class="top__amount">123</div>
          </li>
          <li class="top">
            <div class="top__title">总支出</div>
            <div class="top__amount">-12333</div>
          </li>
        </ul>
      </Card>
    </div>
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
  padding: 0 20px;
  background-image: @linearColor;
}

.card-list {
  padding-top: 10px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  &:first-child {
    padding-bottom: 15px;
    border-bottom: 1px solid @borderColor;
  }

  &:last-child {
    padding-top: 15px;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
  }

  &__amount {
    font-size: 14px;
    color: #ff5a5f;
  }
}
</style>
