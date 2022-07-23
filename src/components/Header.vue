<template>
  <div class="header">
    <div class="header__left" @click="handleBack">
      <span v-show="showBack" class="header__back iconfont">&#xe645;</span>
      <span class="header__title">{{ title }}</span>
    </div>
    <div class="header__right">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: false
  }
});

const handleBack = () => {
  props.showBack && history.back();
};
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 10px;

  &__back {
    margin-right: 10px;
  }

  &__title {
    font-size: 18px;
  }
}
</style>
