<template>
  <Header title="帮助" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :header="false">
        <var-collapse v-model="active" :offset="false" class="help">
          <var-collapse-item v-for="item in helpList" :key="item.title" :title="item.title">
            <p v-for="subItem in item.text" :key="subItem">
              {{ subItem }}
            </p>
          </var-collapse-item>
        </var-collapse>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const active = ref(['']);
const helpList = [
  {
    title: '氢记账有什么特点？',
    text: [
      '1.无需登录，没有账号系统，不会收集任何个人信息',
      '2.本地化存储，通过浏览器的localStorage进行存储，不会上传到服务器',
      '3.交易系统与账户系统相互独立，降低记账的复杂度',
      '4.支持数据的导出与导入，随时备份数据',
      '5.可以按照分类、月份、年份、总支出进行统计，生成对应的图表'
    ]
  },
  {
    title: '如何优雅的记账？',
    text: [
      '1.不记录薅羊毛的部分（交易金额低于0.1元）',
      '2.不记录储蓄充值的部分，例如充值公交卡，超市卡时不记录支出，实际交易时记录当时的支出',
      '3.记录交易的实付金额，若有好评返现等情况，小额的返现（1元、2元等）可以直接忽略，大额的返现（买3免1）则记录返现后的实际支出'
    ]
  },
  {
    title: '如何添加分类？',
    text: ['点击导航栏的“我的”页面，选择选项卡中的“分类“，就可以修改分类了']
  },
  {
    title: '为什么我新增了交易，账户余额不减少？',
    text: [
      '氢记账的交易系统与账户系统是相互独立的模块，互不影响',
      '两者相互分离，记账时只需要记录支出的金额与类型即可，无需选择账户，降低心智负担'
    ]
  },
  {
    title: '为什么交易系统与账户系统相互独立？',
    text: [
      '账户系统只有一个最基础的功能，就是记录此时此刻自己的总资产',
      '账户系统余额的同步是十分困难的，例如余额宝每日收入、好评返现、股票基金变动等等，都会影响到账户余额。',
      '既然如此，账户系统与交易系统直接独立。用户定期（每周、每月）手动更新余额，用于计算当前时刻的总资产。（类似计算器的功能）'
    ]
  },
  {
    title: '为什么没有收入系统？',
    text: [
      '交易系统与账户系统足以估计近期的经济状况，收入系统是完全没有必要的',
      '收入系统的存在，会增加用户的记账压力，难以养成记账习惯'
    ]
  }
];
</script>

<style lang="less" scoped>
@import '../../style/inner.css';

.help {
  --collapse-text-color: var(--fontColor);
  --collapse-header-font-size: 14px;
  box-shadow: none;

  :deep(.var-collapse-item) {
    &__shadow {
      display: none;
    }

    &__header-title {
      font-weight: 700;
    }
  }

  p {
    padding: 5px 0;
  }
}
</style>
