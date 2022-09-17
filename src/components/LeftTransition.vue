<template>
  <Transition name="slide-left">
    <slot></slot>
  </Transition>
</template>

<style lang="less">
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-left-leave-from,
.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-from {
  transform: translateX(100%);
}
</style>
