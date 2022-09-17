<template>
  <router-view v-slot="{ Component, route }">
    <Transition :name="transition">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </Transition>
  </router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const transition = ref('slide-left');
const router = useRouter();

router.afterEach((to, from) => {
  if (!from.name) {
    transition.value = '';
    return;
  }
  
  if (['Home', 'Show', 'My'].includes(from.name as string) && ['Home', 'Show', 'My'].includes(to.name as string)) {
    transition.value = '';
    return;
  }

  if ((to.meta.index as number) > (from.meta.index as number)) {
    transition.value = 'slide-right';
  } else {
    transition.value = 'slide-left';
  }
});
</script>

<style lang="less" scoped>
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.3s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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

.slide-right-leave-active,
.slide-right-enter-active {
  transition: all 0.3s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
