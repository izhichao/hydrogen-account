<template>
  <Transition name="slide-right">
    <slot></slot>
  </Transition>
</template>

<style lang="less">
.slide-right-leave-active,
.slide-right-enter-active {
  transition: all 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-right-leave-from,
.slide-right-enter-to {
  transform: translateX(0);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
</style>
