<template>
  <div class="dock">
    <router-link
      v-for="(item, index) in dockList"
      :key="item.text"
      :to="item.to"
      :class="{ dock__item: true, 'dock__item--active': currentIndex == index }"
    >
      <i class="iconfont" v-html="item.icon"></i>
      <p>{{ item.text }}</p>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  currentIndex: Number
});

const dockList = [
  { icon: '&#xe64e;', text: '首页', to: { name: 'Home' } },
  { icon: '&#xe667;', text: '统计', to: { name: 'Show' } },
  { icon: '&#xe78b;', text: '我的', to: { name: 'My' } }
];
</script>

<style lang="less" scoped>
.dock {
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--themeLightBgColor);
  border-top: 0.5px solid var(--borderColor);
  padding: 0 20px;
  box-sizing: border-box;

  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      font-size: 22px;
    }

    p {
      font-size: 12px;
    }

    &--active {
      i,
      p {
        color: var(--themeColor);
      }
    }
  }
}
</style>
