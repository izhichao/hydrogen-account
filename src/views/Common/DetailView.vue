<template>
  <Header title="添加交易" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :header="false">
        <var-form ref="form">
          <var-space direction="column" :size="[15, 0]">
            <var-space justify="space-around">
              <var-button
                class="switch-btn"
                :type="dealModel.type === 'out' ? 'primary' : 'default'"
                @click="handleSwitch('out')"
              >
                支出
              </var-button>
              <var-button
                class="switch-btn"
                :type="dealModel.type === 'in' ? 'primary' : 'default'"
                @click="handleSwitch('in')"
              >
                收入
              </var-button>
            </var-space>
            <div @click="calculatorRef.handleShow()">
              <div class="form__content form__number">
                {{ dealModel.type === 'out' ? -dealModel.amount : dealModel.amount }}
              </div>
            </div>
            <div>
              <div class="form__title">分类</div>
              <div class="form__category">
                <label
                  v-for="item in list"
                  :key="item.id"
                  :class="{
                    form__category__label: true,
                    'form__category__label--active': item.id === dealModel.categoryId
                  }"
                  :for="item.id.toString()"
                >
                  <input
                    class="form__category__input"
                    type="radio"
                    :id="item.id.toString()"
                    :value="item.id"
                    v-model="dealModel.categoryId"
                  />
                  <span>{{ item.name }}</span>
                </label>
              </div>
            </div>
            <div @click="showDate = true">
              <div class="form__title">日期</div>
              <div class="form__content">{{ dealModel.date }}</div>
            </div>
            <div @click="showTime = true">
              <div class="form__title">时间</div>
              <div class="form__content">{{ dealModel.time }}</div>
            </div>
            <div>
              <div class="form__title">备注</div>
              <var-input
                class="form__content__input"
                :hint="false"
                :line="false"
                placeholder="轻敲添加备注"
                v-model="dealModel.desc"
                clearable
              />
            </div>
            <div>
              <var-button type="primary" block class="form__btn" @click="handleEdit" v-if="type === 'edit'">
                编辑
              </var-button>
              <var-button type="primary" block class="form__btn" @click="handleAdd" v-else>新增</var-button>
            </div>
            <div>
              <var-button
                type="primary"
                block
                class="form__btn"
                @click="handleDelete"
                text
                size="mini"
                v-if="type === 'edit'"
              >
                删除
              </var-button>
            </div>
          </var-space>

          <var-popup v-model:show="showDate">
            <var-date-picker v-model="dealModel.date" @change="handleDate" />
          </var-popup>

          <var-popup v-model:show="showTime">
            <var-time-picker v-model="dealModel.time" format="24hr" />
          </var-popup>
        </var-form>
      </Card>
    </div>
  </div>
  <Calculator ref="calculatorRef" :amount="dealModel.amount" @result="handleUpdateAmount"></Calculator>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useDealStore } from '../../store/useDealStore';
import getNow from '../../utils/getNow';

// 时间与日期选择器
const showDate = ref(false);
const showTime = ref(false);

const handleDate = () => {
  setTimeout(() => {
    showDate.value = false;
  }, 50);
};

const route = useRoute();
const router = useRouter();

const categoryStore = useCategoryStore();
const { categoryLists } = storeToRefs(categoryStore);
const list = ref(categoryLists.value.out);
const dealStore = useDealStore();
const { findDeal, addDeal, editDeal, deleteDeal } = dealStore;

const { type, id, result } = route.query;

// 获取当前时间
const { yearStr, monthStr, dayStr, hourStr, minuteStr } = getNow();

const dealModel = reactive({
  amount: (result as string) || '0',
  categoryId: list.value[0].id,
  date: `${yearStr}-${monthStr}-${dayStr}`,
  time: `${hourStr}:${minuteStr}`,
  desc: '',
  type: 'out'
});

const handleSwitch = (type: string) => {
  if (type === 'out') {
    document.documentElement.style.setProperty('--themeDotColor', 'var(--themeRedColor)');
    list.value = categoryLists.value.out;
  } else if (type === 'in') {
    document.documentElement.style.setProperty('--themeDotColor', 'var(--themeColor)');
    list.value = categoryLists.value.in;
  }
  dealModel.type = type;
  dealModel.categoryId = list.value[0].id;
};

// 获取当前交易信息
if (type === 'edit') {
  const deal = findDeal(+id!);
  dealModel.amount = Math.abs(deal.amount).toString();
  dealModel.categoryId = deal.categoryId;
  dealModel.date = deal.date;
  dealModel.time = deal.time;
  dealModel.desc = deal.desc;
  dealModel.type = deal.amount < 0 ? 'out' : 'in';
}

// 计算器组件 点击确认后更新金额
const calculatorRef = ref();
const handleUpdateAmount = (result: string) => {
  dealModel.amount = result;
};

// 添加交易
const handleAdd = () => {
  if (+dealModel.amount <= 0) {
    Snackbar('请输入正确的金额');
    return;
  }
  addDeal(dealModel.categoryId, dealModel.desc, +dealModel.amount, dealModel.date, dealModel.time, dealModel.type);
  router.push({ name: 'Home' });
};

// 编辑交易
const handleEdit = () => {
  if (+dealModel.amount <= 0) {
    Snackbar('请输入正确的金额');
    return;
  }
  editDeal(
    +id!,
    dealModel.categoryId,
    dealModel.desc,
    +dealModel.amount,
    dealModel.date,
    dealModel.time,
    dealModel.type
  );
  router.go(-1);
};

// 删除交易
const handleDelete = () => {
  Dialog('确认删除').then((res) => {
    if (res === 'confirm') {
      deleteDeal(+id!);
      router.push({ name: 'Home' });
    }
  });
};
</script>

<style lang="less" scoped>
@import '../../style/inner.css';
.form {
  &__title {
    font-size: 12px;
    color: var(--fontLightColor);
  }

  &__content {
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid var(--borderColor);

    &__input {
      border-bottom: 1px solid var(--borderColor);
    }
  }

  &__number {
    color: var(--themeDotColor);
    height: 50px;
    line-height: 50px;
    font-size: 28px;
  }

  &__category {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    margin-top: 15px;

    &__input {
      display: none;
    }

    &__label {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      border: 1px solid var(--borderColor);
      border-radius: 15px;

      &--active {
        color: var(--themeDotColor);
        border: 1px solid var(--themeDotColor);
      }
    }
  }
}

.var-date-picker {
  width: 290px;
  border-radius: 0;
}

.var-time-picker {
  width: 290px;
  border-radius: 0;
}
</style>
