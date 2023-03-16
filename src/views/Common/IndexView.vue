<template>
  <router-view></router-view>
  <Docker :currentIndex="index"></Docker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Docker from '../../components/Docker.vue';
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
