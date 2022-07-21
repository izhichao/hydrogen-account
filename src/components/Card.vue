<template>
  <div class="card">
    <div class="card__header">
      <div class="card__header__title">{{ title }}</div>
      <div class="card__header__more">></div>
    </div>
    <div class="card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style lang="less" scoped>
.card {
  padding: 15px;
  border-radius: 20px;
  background: #fff;

  &:not(:nth-of-type(1)) {
    margin-top: 10px;
  }

  &__header {
    display: flex;
    height: 24px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
