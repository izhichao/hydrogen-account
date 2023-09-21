<template>
  <li class="item" @click="$emit('more')">
    <div class="item__dot item__dot--green" v-if="color === 'green'"></div>
    <div class="item__dot item__dot--red" v-else></div> 
    <div>
      <div class="item__title">
        <span>{{ item.name }}</span>
        <span class="item__desc" v-if="(item as Deal| DealStats | Category).desc">
          {{ (item as Deal | DealStats | Category).desc }}
        </span>
      </div>
    </div>
    <div class="item__btn" v-if="button">
      <slot></slot>
    </div>
    <div class="item__price" v-else>{{ (item as Deal | DealStats | Account).amount }}</div>
  </li>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Account, Deal, DealStats, Category } from '../types';

defineProps({
  item: {
    type: Object as PropType<Deal | DealStats | Account | Category>,
    required: true
  },
  button: {
    type: Boolean,
    default: false
  },
  color: {
    type: String
  }
});
</script>

<style lang="less" scoped>
@import '../style/variables.less';

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

  &__dot {
    position: absolute;
    left: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;

    &--green {
      background-color: @themeGreenColor;
    }

    &--red {
      background-color: @themeRedColor;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
  }

  &__desc {
    margin-left: 5px;
    font-size: 10px;
    font-weight: 400;
    color: @fontLightColor;
  }

  &__price {
    font-size: 14px;
  }
}
</style>
