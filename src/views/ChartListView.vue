<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <div class="switch">
        <var-counter v-model="year" @change="handleYearChange" v-if="timeMode" />
        <div class="switch__date" v-else @click="showDate = true">{{ date }}</div>
        <var-button class="switch__btn" @click="handleSwitchTimeMode" size="mini" v-if="type === 'category'">
          切换
        </var-button>
      </div>
      <ChartCard :title="title" :amount="expends" :more="false"></ChartCard>
      <Card :header="false" v-for="item in list" class="padding-small">
        <ListItem :item="item" @click="handlePush(item)"></ListItem>
      </Card>
    </div>
  </div>
  <var-popup v-model:show="showDate">
    <var-date-picker v-model="date" type="month" @change="handleMonthChange" />
  </var-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { DealStats } from '../types/deal';
import { useDealStore } from '../store/useDealStore';
import { useTime } from '../composables/useTime';

const route = useRoute();
const router = useRouter();
const { dealListGroup } = useDealStore();
const { now } = useTime();
const list = ref<DealStats[]>([]);

let { type, time } = route.query;
// 没有指定时间，默认为当前时间
if (!time) {
  time = `${now().yearStr}-${now().monthStr}`;
}
// 没有指定类型，默认为分类
if (!type) {
  type = 'category';
}

let [defaultYear, defaultMonth] = (time as string).split('-');

const showDate = ref(false);
const timeMode = ref(type === 'month');
const year = ref<number>(+defaultYear); // 年
const date = ref<string>(`${defaultYear}-${defaultMonth}`); // 年-月

// 页面跳转
const handlePush = (item: DealStats) => {
  if (type === 'category') {
    // 类型为分类时，根据年或月跳转到详情页
    router.push({
      name: 'List',
      query: { list: 'deal', time: timeMode.value ? year.value : date.value, keyword: item.name }
    });
  } else {
    router.push({ name: 'List', query: { list: 'deal', time: item.name } });
  }
};

const handleStatsList = (time: string) => {
  list.value = [];
  let id = 0;
  dealListGroup(type as string, { time }).forEach((item) => {
    list.value.push({
      id,
      name: item.name,
      desc: `${item.value.length}笔`,
      amount: item.total
    });
    id++;
  });
};

// 首次进入页面时，初始化数据
const title = ref('分类统计');
const expends = dealListGroup(time?.length === 4 ? 'year' : 'month', { time: time as string })[0]?.total || 0;

if (type === 'day') {
  // 月支出
  handleStatsList(time as string);
  if (defaultYear === now().yearStr) {
    title.value = `${(+defaultMonth).toString()}月支出`; // 今年只显示月份
  } else {
    title.value = `${defaultYear}年${defaultMonth}月支出`; // 不是今年显示年、月
  }
} else if (type === 'month') {
  // 年支出
  title.value = `${time}年支出`;
  handleStatsList(time as string);
} else {
  // 分类统计
  handleStatsList(time as string);
}

// 修改时间，重新获取数据
const handleSwitchTimeMode = () => {
  timeMode.value = !timeMode.value;
  if (timeMode.value) {
    handleStatsList(year.value.toString());
  } else {
    handleStatsList(date.value);
  }
};

const handleMonthChange = () => {
  if (type === 'day') {
    if (date.value.split('-')[0] === now().yearStr) {
      // 今年只显示月份
      title.value = `${+date.value.split('-')[1].toString()}月支出`;
    } else {
      // 不是今年显示年、月
      title.value = `${date.value.replace('-', '年')}月支出`;
    }
  }
  handleStatsList(date.value);
  setTimeout(() => {
    showDate.value = false;
  }, 30);
};

const handleYearChange = () => {
  if (type === 'month') {
    title.value = `${year.value}年支出`;
  }
  handleStatsList(year.value.toString());
};
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';
:deep(.var-counter) {
  &__input {
    width: 40px;
  }
}

.switch {
  display: flex;
  align-items: center;

  &__date {
    width: 112px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background-color: #4aaef8;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }

  &__btn {
    margin-left: 8px;
  }
}

.var-date-picker {
  width: 290px;
  border-radius: 0;
}
</style>
