<template>
  <div class="card">
    <div class="card__header" v-show="showHeader">
      <div class="card__header__title">{{ title }}</div>
      <div class="card__header__more iconfont">&#xe658;</div>
    </div>
    <div class="card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String
  },
  showHeader: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="less" scoped>
@import '../style/variables.less';
.card {
  padding: 15px;
  border-radius: 20px;
  background: #fff;

  &:not(:nth-of-type(1)) {
    margin-top: 10px;
  }

  &__header {
    display: flex;
    height: 20px;
    margin-bottom: 5px;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-size: 14px;
      font-weight: 700;
    }

    &__more {
      font-size: 13px;
      margin-right: 5px;
      color: @themeColor;
      opacity: 0.85;
    }
  }
}
</style>
