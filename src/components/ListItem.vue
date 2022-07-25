<template>
  <li class="item">
    <div>
      <div class="item__title">{{ item.title }}</div>
      <div class="item__desc" v-show="item.desc">{{ item.desc }}</div>
    </div>
    <div class="item__price" v-show="!showBtn">{{ item.amount }}</div>
    <div class="item__btn" v-show="showBtn">
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
export interface Deal {
  id: number;
  title: string;
  desc?: string;
  amount?: number;
}
defineProps({
  item: {
    type: Object as PropType<Deal>,
    required: true
  },
  showBtn: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="less" scoped>
.item {
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
    font-size: 10px;
    color: #999;
  }

  &__price {
    font-size: 14px;
  }
}
</style>
