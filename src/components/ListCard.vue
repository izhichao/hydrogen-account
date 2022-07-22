<template>
  <Card :title="title">
    <ul class="list">
      <li class="list__item" v-for="item in list" :key="item.id">
        <div>
          <div class="list__item__title">{{ item.title }}</div>
          <div class="list__item__desc" v-show="item.desc">{{ item.desc }}</div>
        </div>
        <div class="list__item__price">{{ item.amount }}</div>
      </li>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import Card from './Card.vue';
export interface Deal {
  id: number;
  title: string;
  desc?: string;
  amount: number;
}

defineProps({
  title: {
    type: String,
    required: true
  },
  list: {
    type: Array as PropType<Deal[]>,
    required: true
  }
});
</script>

<style lang="less" scoped>
.list {
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;
    height: 34px;

    &:first-child {
      margin-top: 15px;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #ff6c7a;
    }

    &__title {
      font-size: 14px;
      font-weight: 700;
    }

    &__desc {
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
