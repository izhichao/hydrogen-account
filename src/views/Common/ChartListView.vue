<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <div class="switch">
        <var-counter v-model="year" v-if="timeMode" @change="handleYearChange" />
        <div class="switch__date" v-else-if="!timeMode && route.query.time" @click="showDate = true">
          {{ yearAndMonth }}
        </div>
        <var-button class="switch__btn" size="mini" v-if="type === 'category'" @click="handleSwitchTimeMode">
          切换
        </var-button>
      </div>
      <ChartCard :title="title" :amount="expends" :option="options" :more="false"></ChartCard>
      <Card :header="false" v-for="item in list" :key="item.id" class="padding-small">
        <ListItem :item="item" @click="handlePush(item)"></ListItem>
      </Card>
    </div>
  </div>
  <var-popup v-model:show="showDate">
    <var-date-picker v-model="yearAndMonth" type="month" @change="handleMonthChange" />
  </var-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../../components/Header.vue';
import ChartCard from '../../components/ChartCard.vue';
import Card from '../../components/Card.vue';
import ListItem from '../../components/ListItem.vue';
import { DealStats } from '../../types/deal';
import { useDealStore } from '../../store/useDealStore';
import getNow from '../../utils/getNow';
import { useChart } from '../../composables/useChart';
import * as math from 'mathjs';

const route = useRoute();
const router = useRouter();
const { dealListGroup } = useDealStore();
const { categoryOptions, dayOptions, monthOptions, yearOptions } = useChart();
const options = ref();
const list = ref<DealStats[]>([]);

let { type, time } = route.query;
// 没有指定时间，默认为当前时间
if (!time) {
  time = `${getNow().yearStr}-${getNow().monthStr}`;
}
// 没有指定类型，默认为全部
if (!type) {
  type = 'year';
}

let [defaultYear, defaultMonth] = (time as string).split('-');

const showDate = ref(false);
const timeMode = ref(type === 'month');
const expends = ref(0);
const year = ref<number>(+defaultYear); // 年
const yearAndMonth = ref<string>(`${defaultYear}-${defaultMonth}`); // 年-月

// 页面跳转
const handlePush = (item: DealStats) => {
  if (type === 'category') {
    // 类型为分类时，根据年或月跳转到详情页
    router.push({
      name: 'List',
      query: { list: 'deal', time: timeMode.value ? year.value : yearAndMonth.value, keyword: item.name }
    });
  } else {
    router.push({ name: 'List', query: { list: 'deal', time: item.name } });
  }
};

// 根据时间与类型获取对应的数据
const handleStatsList = (time?: string) => {
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

// 当列表改变时，修改支出
watch(
  () => list.value,
  () => {
    expends.value = math.number(
      list.value.reduce(
        (total, currentValue) => math.add(math.bignumber(total), math.bignumber(currentValue.amount)),
        math.bignumber(0)
      )
    );
  }
);

// 首次进入页面时，初始化数据
const title = ref('分类统计');
if (type === 'day') {
  if (defaultYear === getNow().yearStr) {
    title.value = `${(+defaultMonth).toString()}月支出`; // 今年只显示月份
  } else {
    title.value = `${defaultYear}年${defaultMonth}月支出`; // 不是今年显示年、月
  }
  options.value = dayOptions(time as string);
  handleStatsList(time as string);
} else if (type === 'month') {
  title.value = `${time}年支出`;
  options.value = monthOptions(time as string);
  handleStatsList(time as string);
} else if (type === 'year') {
  title.value = `全部支出`;
  options.value = yearOptions();
  handleStatsList();
} else if (type === 'category') {
  options.value = categoryOptions(time as string);
  handleStatsList(time as string);
}

// 分类页面：修改时间模式，重新获取数据
const handleSwitchTimeMode = () => {
  timeMode.value = !timeMode.value;
  if (timeMode.value) {
    options.value = categoryOptions(year.value.toString());
    handleStatsList(year.value.toString());
  } else {
    options.value = categoryOptions(yearAndMonth.value);
    handleStatsList(yearAndMonth.value);
  }
};

// 修改月
const handleMonthChange = () => {
  if (type === 'day') {
    options.value = dayOptions(yearAndMonth.value);
    if (yearAndMonth.value.split('-')[0] === getNow().yearStr) {
      // 今年只显示月份
      title.value = `${+yearAndMonth.value.split('-')[1].toString()}月支出`;
    } else {
      // 不是今年显示年、月
      title.value = `${yearAndMonth.value.replace('-', '年')}月支出`;
    }
  } else if (type === 'category') {
    options.value = categoryOptions(yearAndMonth.value);
  }
  handleStatsList(yearAndMonth.value);
  setTimeout(() => {
    showDate.value = false;
  }, 30);
};

// 修改年
const handleYearChange = () => {
  if (type === 'month') {
    options.value = monthOptions(year.value.toString());
    title.value = `${year.value}年支出`;
  } else if (type === 'category') {
    options.value = categoryOptions(year.value.toString());
  }
  handleStatsList(year.value.toString());
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/inner.less';
:deep(.var-counter) {
  &__input {
    width: 40px;
  }
}

.switch {
  display: flex;
  align-items: center;
  --counter-background: @themeLightColor;

  &__date {
    width: 112px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: @themeLightBgColor;
    background-color: @themeLightColor;
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
