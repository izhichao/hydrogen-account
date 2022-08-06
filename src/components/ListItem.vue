<template>
  <li class="item" @click="$emit('more')">
    <div>
      <div class="item__title">
        <span>{{ item.name }}</span>
        <span class="item__desc" v-if="(item as Deal| DealStats | Category).desc">
          {{ (item as Deal | DealStats | Category).desc }}
        </span>
      </div>
    </div>
    <div class="item__price" v-if="!button">{{ (item as Deal | DealStats | Account).amount }}</div>
    <div class="item__btn" v-if="button">
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Account } from '../types/account';
import { Deal, DealStats } from '../types/deal';
import { Category } from '../types/category';

defineProps({
  item: {
    type: Object as PropType<Deal | DealStats | Account | Category>,
    required: true
  },
  button: {
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
  height: 30px;

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
    margin-left: 5px;
    font-size: 10px;
    font-weight: 400;
    color: #999;
  }

  &__price {
    font-size: 14px;
  }
}
</style>
