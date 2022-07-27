<template>
  <Header title="所有交易" :showBack="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :header="false">
        <ul>
          <li class="top" v-for="item in topModel">
            <div class="top__title">{{ item.title }}</div>
            <div class="top__amount">{{ item.amount }}</div>
          </li>
        </ul>
      </Card>

      <!-- 账户统计 -->
      <Card :header="false">
        <ListItem v-for="item in accountList" :item="item"></ListItem>
        <div class="add-btn">
          123
        </div>
      </Card>

      <div class="deal" v-for="(item, key) in dealList" :key="key">
        <div class="deal__day">
          <div class="deal__day__time">{{ key }}</div>
          <div class="deal__day__total">-120</div>
        </div>

        <Card :header="false">
          <ListItem v-for="subItem in item" :item="subItem"></ListItem>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ListItem, { Deal } from '../components/ListItem.vue';

const topModel = [
  { title: '交易数', amount: '123' },
  { title: '总支出', amount: '-12333' }
];

const accountList: Deal[] = [
  { id: 0, title: '支付宝', amount: 5000 },
  { id: 1, title: '微信', amount: 5000 }
];

const dealList = {
  20220725: [
    { id: 1, title: '购物', amount: -4.58 },
    { id: 2, title: '购物', amount: -4.58 }
    ],
  20220726: [
    { id: 0, title: '购物', desc: '手机壳', amount: -4.58 },
    { id: 2, title: '购物', amount: -4.58 },
    { id: 1, title: '购物', desc: '手机壳', amount: -4.58 }
  ]
};
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

.deal {
  &__day {
    padding: 10px 15px 0;
    display: flex;
    justify-content: space-between;

    &__time,
    &__total {
      font-size: 13px;
      color: #999;
    }
  }
}
</style>
