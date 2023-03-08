<template>
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
        <div class="select__item" v-for="item in selectList" :key="item.text" @click="handleClick(item.text)">
          <div class="select__item__icon iconfont" v-html="item.icon"></div>
          <div class="select__item__title">{{ item.text }}</div>
          <div class="select__item__enter iconfont">&#xe645;</div>
        </div>
      </div>
    </Card>
  </div>
  <input type="file" ref="inRef" style="display: none" />

  <var-popup v-model:show="config">
    <div class="config">
      <div class="config__show">
        <div class="config__show__title">统计图表</div>
        <var-checkbox v-model="show.category">分类</var-checkbox>
        <var-checkbox v-model="show.day">月支出</var-checkbox>
        <var-checkbox v-model="show.month">年支出</var-checkbox>
        <var-checkbox v-model="show.year">总支出</var-checkbox>
      </div>
    </div>
  </var-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue';
import Card from '../../components/Card.vue';
import { useSelect } from '../../composables/useSelect';
import { useAccountStore } from '../../store/useAccountStore';
import { useDealStore } from '../../store/useDealStore';
import { useConfigStore } from '../../store/useConfigStore';
const { inRef, handleClear, handleIn, handleOut, handleShare } = useSelect();

// 获取总支出 交易数 记账天数
const dealStore = useDealStore();
const { totalExpend, dealAmount, timeDiff } = storeToRefs(dealStore);

// 获取总资产
const accountStore = useAccountStore();
const { totalAsset } = storeToRefs(accountStore);

// 统计图表显示设置
const config = ref(false);
const configStore = useConfigStore();
const { show } = storeToRefs(configStore);

const router = useRouter();

const selectList = [
  { icon: '&#xe65e;', text: '分类' },
  { icon: '&#xe621;', text: '导入' },
  { icon: '&#xe622;', text: '导出' },
  { icon: '&#xe615;', text: '清空' },
  { icon: '&#xe677;', text: '帮助' },
  { icon: '&#xe600;', text: '设置' },
  { icon: '&#xe739;', text: '分享' }
];

// 处理各个按钮的跳转
const handleClick = (type: string) => {
  switch (type) {
    case '分类':
      router.push({ name: 'Category' });
      break;
    case '导入':
      handleIn();
      break;
    case '导出':
      handleOut();
      break;
    case '清空':
      handleClear();
      break;
    case '帮助':
      router.push({ name: 'Help' });
      break;
    case '设置':
      config.value = true;
      break;
    case '分享':
      handleShare();
      break;
  }
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';

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
    color: @themeRedColor;
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
      color: @fontLightColor;
      font-size: 10px;
      margin-top: 5px;
    }

    &__amount {
      font-weight: 700;
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
      line-height: 22px;
      font-size: 14px;
    }

    &__enter {
      position: absolute;
      right: 8px;
      transform: rotate(180deg);
      line-height: 22px;
      font-size: 14px;
    }
  }
}

:deep(.var-popup__content) {
  border-radius: 15px;
}
.config {
  padding: 20px 24px;
  width: 250px;

  &__show {
    display: flex;
    flex-direction: column;

    :deep(.var-icon) {
      font-size: 20px;
    }

    &__title {
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
}
</style>
