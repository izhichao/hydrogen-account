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
    </div>

    <input type="file" ref="inRef" style="display: none" />
  </div>
  <Docker :currentIndex="2"></Docker>
</template>

<script lang="ts" setup>
import Header from '../../components/Header.vue';
import Circle from '../../components/Circle.vue';
import Docker from '../../components/Docker.vue';
import Card from '../../components/Card.vue';
import { Dialog, Snackbar } from '@varlet/ui';
import { useRouter } from 'vue-router';
import { useAccountStore } from '../../store/useAccountStore';
import { useDealStore } from '../../store/useDealStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useConfigStore } from '../../store/useConfigStore';
import { useTime } from '../../composables/useTime';
import { Deal } from '../../types/deal';
import { Category } from '../../types/category';
import { Account } from '../../types/account';
import { Show } from '../../types/config';
import { useCategoryStore } from '../../store/useCategoryStore';

const config = ref(false);
const inRef = ref();
const accountStore = useAccountStore();
const dealStore = useDealStore();
const categoryStore = useCategoryStore();
const configStore = useConfigStore();
const { show } = storeToRefs(configStore);
const { replaceCategory } = categoryStore;
const { totalAsset } = storeToRefs(accountStore);
const { totalExpend, dealAmount, timeDiff } = storeToRefs(dealStore);
const router = useRouter();

const handleIn = () => {
  // 点击导入
  inRef.value.click();
  // 上传文件后，获取文件内容
  inRef.value.onchange = () => {
    const file = inRef.value.files[0];
    // 若文件不为JSON格式，则提示错误
    if (file.type !== 'application/json') {
      Snackbar.error({
        content: '请上传JSON文件',
        duration: 2000
      });
      return;
    }
    // 获取文件内容
    const reader = new FileReader();
    reader.readAsText(file, 'utf-8');
    reader.onload = (res) => {
      try {
        const json = JSON.parse(res.target?.result as string);
        const { account, category, config, deal } = json;
        localStorage.setItem('account', JSON.stringify(account));
        localStorage.setItem('category', JSON.stringify(category));
        localStorage.setItem('config', JSON.stringify(config));
        localStorage.setItem('deal', JSON.stringify(deal));
        Snackbar.success({
          content: '导入成功',
          duration: 1500
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (e) {
        Snackbar.error({
          content: 'JSON文件格式错误',
          duration: 2000
        });
      }
    };
  };
};

const handleOut = () => {
  const { yearStr, monthStr, dayStr } = useTime().now();
  // 创建一个对象用于存储数据
  let obj: {
    config?: Show;
    category?: Category[];
    account?: Account[];
    deal?: Deal[];
  } = {};
  obj.config = JSON.parse(localStorage.getItem('config') || '');
  obj.category = JSON.parse(localStorage.getItem('category') || '');
  obj.account = JSON.parse(localStorage.getItem('account') || '');
  obj.deal = JSON.parse(localStorage.getItem('deal') || '');

  // 创建一个a标签用于下载
  const data = JSON.stringify(obj);
  const blob = new Blob([data], { type: 'text/json' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `H2记账_${yearStr}年${monthStr}月${dayStr}日.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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
  { icon: '&#xe739;', text: '分享' }
];

const handleClick = (index: number) => {
  switch (index) {
    case 0:
      router.push({ name: 'Category' });
      break;
    case 1:
      handleIn();
      break;
    case 2:
      handleOut();
      break;
    case 3:
      handleClear();
      break;
    case 4:
      router.push({ name: 'Help' });
      break;
    case 5:
      config.value = true;
      break;
    case 6:
      if (!navigator.share) {
        alert('您的浏览器不支持分享功能！');
      } else {
        navigator.share({
          title: 'H2记账',
          url: window.location.href.replace(window.location.hash, ''),
          text: '轻量级记账神器，记录您的每一笔交易！'
        });
      }
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
