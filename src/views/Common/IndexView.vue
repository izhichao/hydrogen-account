<template>
  <router-view></router-view>
  <Dock :currentIndex="index"></Dock>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const index = ref(0);

switch (route.name) {
  case 'Home':
    index.value = 0;
    break;
  case 'Show':
    index.value = 1;
    break;
  case 'My':
    index.value = 2;
    break;
}
</script>
