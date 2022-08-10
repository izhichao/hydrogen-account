<template>
  <div class="main-content">
    <Circle></Circle>
    <Header title="统计"></Header>

    <div class="card-list">
      <ChartCard
        title="分类统计"
        :amount="monthExpend"
        :option="categoryOption"
        @more="router.push({ name: 'Chart', query: { type: 'category', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        :title="`${month}月支出`"
        :amount="monthExpend"
        :option="dayOption"
        @more="router.push({ name: 'Chart', query: { type: 'day', time: `${year}-${monthStr}` } })"
      ></ChartCard>
      <ChartCard
        :title="`${year}年支出`"
        :amount="yearExpend"
        :option="monthOption"
        @more="router.push({ name: 'Chart', query: { type: 'month', time: `${year}` } })"
      ></ChartCard>
      <ChartCard
        :title="`全部支出`"
        :amount="totalExpend"
        :option="yearOption"
        @more="router.push({ name: 'Chart', query: { type: 'year' } })"
      ></ChartCard>
    </div>
  </div>
  <Docker :currentIndex="1"></Docker>
</template>

<script lang="ts" setup>
import Circle from '../components/Circle.vue';
import Header from '../components/Header.vue';
import ChartCard from '../components/ChartCard.vue';
import Docker from '../components/Docker.vue';
import { useRouter } from 'vue-router';
import { useDealStore } from '../store/useDealStore';
import { useTime } from '../composables/useTime';
const { totalExpend, dealListGroup } = useDealStore();
const { now } = useTime();
const { year, month, monthStr } = now();
const router = useRouter();

const monthExpend = dealListGroup('month', { time: `${year}-${monthStr}` })[0]?.total || 0;
const yearExpend = dealListGroup('year', { time: `${year}` })[0]?.total || 0;
const categoryOption = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50,50,50,0.7)',
    textStyle: {
      color: '#fff'
    }
  },
  title: [
    {
      text: '交易笔数',
      subtext: '320',
      x: '48.5%',
      y: '35%',
      textAlign: 'center',
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
      subtextStyle: {
        fontSize: 16,
        color: '#333'
      }
    }
  ],
  series: [
    {
      name: '分类统计',
      type: 'pie',
      radius: ['60%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        { value: 50, name: '购物' },
        { value: 124, name: '水电费' },
        { value: 12, name: '交通' }
      ]
    }
  ]
};

const dayOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50,50,50,0.7)',
    textStyle: {
      color: '#fff'
    }
  },
  xAxis: {
    type: 'category',
    name: '日期',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#999'
      }
    }
  },
  yAxis: { show: false },
  color: ['#4aaef8'],
  series: [
    {
      name: '支出',
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      itemStyle: {
        opacity: 0
      },
      smooth: true
    }
  ],
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: '15%'
  }
};

const monthOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50,50,50,0.7)',
    textStyle: {
      color: '#fff'
    },
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    name: '月份',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#999'
      }
    }
  },
  yAxis: { show: false },
  color: ['#4aaef8'],
  series: [
    {
      name: '支出',
      type: 'bar',
      barWidth: '60%',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  ],
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: '15%'
  }
};

const yearOption = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50,50,50,0.7)',
    textStyle: {
      color: '#fff'
    }
  },
  title: [
    {
      text: '记账天数',
      subtext: '320',
      x: '48.5%',
      y: '35%',
      textAlign: 'center',
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
      subtextStyle: {
        fontSize: 16,
        color: '#333'
      }
    }
  ],
  series: [
    {
      name: '全部支出',
      type: 'pie',
      radius: ['60%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        { value: 50, name: '2022' },
        { value: 124, name: '2021' },
        { value: 12, name: '2020' }
      ]
    }
  ]
};
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}
</style>
