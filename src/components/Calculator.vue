<template>
  <var-popup position="bottom" v-model:show="show">
    <div class="calculator">
      <div class="calculator__result">
        <input type="text" />
      </div>
      <div class="calculator__btns">
        <span class="calculator__btn" v-ripple>C</span>
        <span class="calculator__btn" v-ripple>/</span>
        <span class="calculator__btn" v-ripple>*</span>
        <span class="calculator__btn" v-ripple>DEL</span>
        <span class="calculator__btn" v-ripple>7</span>
        <span class="calculator__btn" v-ripple>8</span>
        <span class="calculator__btn" v-ripple>9</span>
        <span class="calculator__btn" v-ripple>-</span>
        <span class="calculator__btn" v-ripple>4</span>
        <span class="calculator__btn" v-ripple>5</span>
        <span class="calculator__btn" v-ripple>6</span>
        <span class="calculator__btn" v-ripple>+</span>
        <span class="calculator__btn" v-ripple>1</span>
        <span class="calculator__btn" v-ripple>2</span>
        <span class="calculator__btn" v-ripple>3</span>
        <span class="calculator__btn calculator__btn__ok" v-ripple>OK</span>
        <span class="calculator__btn calculator__btn__zero" v-ripple>0</span>
        <span class="calculator__btn" v-ripple>.</span>
      </div>
    </div>
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
@import '../style/variables.less';

.calculator {
  &__result {
    height: 60px;
    border-bottom: 0.5px solid #eee;

    input {
      width: 100%;
      height: 100%;
      text-align: right;
      border: none;
      outline: none;
      font-size: 20px;
      padding: 0 20px;
    }
  }
  &__btns {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 55px);
  }

  &__btn {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.5px solid #eee;
    user-select: none; // 禁止选中文字

    &__ok {
      grid-column: 4 / 5;
      grid-row: 4 / 6;
      background-color: @themeColor;
      color: #eee;
      border: 0.5px solid @themeColor;
    }

    &__zero {
      grid-column: 1 / 3;
    }
  }
}
</style>
