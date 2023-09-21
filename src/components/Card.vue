<template>
  <div class="card">
    <div class="card__header" v-if="header" @click="$emit('more')">
      <div class="card__header__title">{{ title }}</div>
      <div class="card__header__more iconfont" v-if="more">&#xe658;</div>
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
  header: {
    type: Boolean,
    default: true
  },
  more: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="less" scoped>
.card {
  padding: 15px;
  border-radius: 20px;
  background: var(--themeLightBgColor);

  &:not(:nth-of-type(1)) {
    margin-top: 10px;
  }

  &__header {
    display: flex;
    height: 20px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-size: 14px;
      font-weight: 700;
    }

    &__more {
      font-size: 13px;
      margin-right: 5px;
      color: var(--themeColor);
      opacity: 0.85;
    }
  }
}

// 列表项只有一个时，修改padding值
.padding-small {
  padding: 10px 15px;
}
</style>
