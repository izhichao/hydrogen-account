<template>
  <var-popup position="bottom" v-model:show="show">
    <div class="popup-example-block"></div>
  </var-popup>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

// 双向绑定状态
const emits = defineEmits(['update:show']);
watch(
  () => props.show,
  (newVal) => {
    emits('update:show', newVal);
  }
);
</script>

<style lang="less" scoped>
.popup-example-block {
  padding: 20px 24px;
  width: 250px;
}
</style>
