<template>
  <var-popup position="bottom" v-model:show="show">
    <div class="calculator">
      <div class="calculator__result">
        <input type="text" v-model="result" />
      </div>
      <div class="calculator__btns">
        <span
          v-for="item in btns"
          v-ripple
          :class="{
            calculator__btn: true,
            calculator__btn__ok: item === 'OK' ? true : false,
            calculator__btn__zero: item === '0' ? true : false
          }"
          @click="handleClickBtn(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </var-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  amount: {
    type: String,
    default: ''
  }
});

const btns = ['C', '/', '*', 'DEL', '1', '2', '3', '-', '4', '5', '6', '+', '7', '8', '9', 'OK', '0', '.'];
const route = useRoute();
const router = useRouter();
const show = ref(false);
const emits = defineEmits(['result']);
const handleShow = () => {
  show.value = true;
};

const result = ref(props.amount);

const handleClickBtn = (str: string) => {
  const lastOne = result.value[result.value.length - 1];
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(str)) {
    result.value += str;
  } else if (['+', '-', '*', '/'].includes(str)) {
    // 运算符
    if (!result.value.length) {
      return;
    } else if (['.', '+', '-', '*', '/'].includes(lastOne)) {
      result.value = result.value.slice(0, -1) + str;
    } else {
      result.value += str;
    }
  } else if (str === 'DEL') {
    result.value = result.value.slice(0, -1);
  } else if (str === 'C') {
    result.value = '';
  } else if (str === '.') {
    if (!result.value.length || ['+', '-', '*', '/'].includes(lastOne)) {
      // 如果最后一位是运算符，自动补0
      result.value += '0.';
    } else if (lastOne === '.') {
      // 如果最后一位是小数点，不做处理
      return;
    } else {
      result.value += str;
    }
  } else {
    if (
      result.value.includes('+') ||
      result.value.includes('-') ||
      result.value.includes('*') ||
      result.value.includes('/')
    ) {
      result.value = (+(eval(result.value) as number).toFixed(2)).toString();
    } else {
      if (route.name === 'Home') {
        router.push({ name: 'Detail', query: { type: 'add', result: result.value } });
      } else if (route.name === 'Detail') {
        emits('result', result.value);
        show.value = false;
      }
    }
  }
};

defineExpose({
  handleShow
});
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
