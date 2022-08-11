<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="我的"></Header>
    <div class="card-list">
      <Card :header="false">
        <div class="total">
          <div class="total__title">总资产</div>
          <div class="total__amount">{{ totalAsset }}</div>
        </div>
        <div class="statistics">
          <div class="statistics__count">
            <div class="statistics__count__amount">{{ timeDiff }}</div>
            <div class="statistics__count__title">记账天数</div>
          </div>
          <div class="statistics__count">
            <div class="statistics__count__amount">{{ dealAmount }}</div>
            <div class="statistics__count__title">交易笔数</div>
          </div>
          <div class="statistics__count">
            <div class="statistics__count__amount">{{ -totalExpend }}</div>
            <div class="statistics__count__title">总支出</div>
          </div>
        </div>
      </Card>

      <Card :header="false">
        <div class="select">
          <div class="select__item" v-for="(item, index) in selectList" :key="item.text" @click="handleClick(index)">
            <div class="select__item__icon iconfont" v-html="item.icon"></div>
            <div class="select__item__title">{{ item.text }}</div>
            <div class="select__item__enter iconfont">&#xe645;</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
  <Docker :currentIndex="2"></Docker>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Circle from '../components/Circle.vue';
import Docker from '../components/Docker.vue';
import Card from '../components/Card.vue';
import { Dialog } from '@varlet/ui';
import { useRouter } from 'vue-router';
import { useAccountStore } from '../store/useAccountStore';
import { useDealStore } from '../store/useDealStore';
import { storeToRefs } from 'pinia';
const accountStore = useAccountStore();
const dealStore = useDealStore();
const { totalAsset } = storeToRefs(accountStore);
const { totalExpend, dealAmount, timeDiff } = storeToRefs(dealStore);
const router = useRouter();

const handleClear = () => {
  Dialog('数据将无法恢复！确认清空？').then((res) => {
    if (res === 'confirm') {
      localStorage.clear();
    }
  });
};
const selectList = [
  { icon: '&#xe65e;', text: '分类' },
  { icon: '&#xe621;', text: '导入' },
  { icon: '&#xe622;', text: '导出' },
  { icon: '&#xe615;', text: '清空' },
  { icon: '&#xe677;', text: '帮助' },
  { icon: '&#xe600;', text: '设置' },
  { icon: '&#xe739;', text: '分享' },
];

const handleClick = (index: number) => {
  switch (index) {
    case 0:
      router.push({ name: 'Category' });
      break;
    case 1:
      console.log('导入');
      break;
    case 2:
      console.log('导出');
      break;
    case 3:
      handleClear();
      break;
    case 4:
      console.log('帮助');
      break;
    case 5:
      console.log('设置');
      break;
    case 6:
      console.log('分享');
      break;
  }
};
</script>

<style lang="less" scoped>
@import '../style/variables.less';

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px 15px;

  &__title {
    font-weight: 700;
  }

  &__amount {
    font-size: 22px;
    font-weight: 700;
    color: #ff6c7a;
  }
}

.statistics {
  display: flex;
  padding: 5px 0;

  &__count {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      color: #999;
      font-size: 10px;
      margin-top: 5px;
    }

    &__amount {
      font-weight: 700;
      color: #333;
    }
  }
}

.select {
  padding: 0 6px;
  box-sizing: border-box;
  &__item {
    display: flex;
    position: relative;
    padding: 12px 0;

    &__icon {
      margin: 0 10px 0 8px;
      width: 22px;
      height: 22px;
      font-size: 18px;
    }

    &__title {
      color: @fontColor;
      line-height: 22px;
      font-size: 14px;
    }

    &__enter {
      position: absolute;
      right: 8px;
      // color: #c2c4ca;
      transform: rotate(180deg);
      line-height: 22px;
      font-size: 14px;
    }
  }
}
</style>
