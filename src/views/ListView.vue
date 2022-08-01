<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :header="false">
        <ul>
          <li class="total" v-for="item in totalModel">
            <div class="total__title">{{ item.title }}</div>
            <div class="total__amount">{{ item.amount }}</div>
          </li>
        </ul>
      </Card>

      <!-- 交易统计 -->
      <template v-if="route.query.type === 'deal'">
        <div class="deal" v-for="(item, key) in dealTimeList" :key="key">
          <div class="deal__day">
            <div class="deal__day__time">{{ key }}</div>
            <div class="deal__day__total">-120</div>
          </div>

          <Card :header="false" :class="{ 'padding-small': item.length === 1 }">
            <ListItem v-for="subItem in item" :item="subItem"></ListItem>
          </Card>
        </div>
      </template>

      <!-- 账户统计 -->
      <Card :header="false" v-else-if="route.query.type === 'account'" class="padding-small">
        <ListItem v-for="item in accountList" :item="item" @click="handleShowEdit(item.id)"></ListItem>

        <div class="add" v-ripple @click="handleShowAdd">
          <var-icon name="plus" :size="24" />
        </div>
      </Card>

      <var-dialog v-model:show="editModel.status" @confirm="handleAdd">
        <var-input placeholder="请输入新的账户名" v-model="editModel.name" />
        <var-input placeholder="请输入余额" v-model="editModel.amount" />
      </var-dialog>

      <var-dialog v-model:show="addModel.status" @confirm="handleAdd">
        <var-input placeholder="请输入新的账户名" v-model="addModel.name" />
        <var-input placeholder="请输入余额" v-model.number="addModel.amount" />
      </var-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ListItem, { Item } from '../components/ListItem.vue';
import { reactive, ref } from 'vue';
import { useItemStore } from '../store/useItemStore';
import { storeToRefs } from 'pinia';
import { Snackbar } from '@varlet/ui';
import { useRoute } from 'vue-router';
const route = useRoute();
const ItemStore = useItemStore();
const { addAccount, dealTimeList } = ItemStore;
const { accountList, dealList } = storeToRefs(ItemStore);

const title = ref('所有交易');
const totalModel = reactive([
  { title: '交易数', amount: 0 },
  { title: '总支出', amount: 0 }
]);

if (route.query.type === 'deal') {
  totalModel[0].amount = dealList.value.length;
  totalModel[1].amount = dealList.value.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
} else if (route.query.type === 'account') {
  title.value = '所有账户';
  const sum = accountList.value.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
  totalModel[0] = { title: '账户数', amount: accountList.value.length };
  totalModel[1] = { title: '总资产', amount: sum };
}

const editModel = reactive({
  name: '',
  amount: undefined,
  status: false
});

const handleShowEdit = (id: number) => {
  editModel.status = true;
  console.log(id);
};

// 新增账户
const addModel = reactive({
  name: '',
  amount: '',
  status: false
});

const handleShowAdd = () => {
  addModel.status = true;
};

const handleAdd = () => {
  if (!addModel.name || !addModel.amount) {
    Snackbar('请输入账户名与余额');
    return;
  }
  addAccount(addModel.name, +addModel.amount);
  addModel.name = '';
  addModel.amount = '';
};

const isAccount = ref(false);
if (accountList) {
  isAccount.value = true;
}
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/inner.less';

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  &:first-child {
    padding-bottom: 15px;
    border-bottom: 1px solid @borderColor;
  }

  &:last-child {
    padding-top: 15px;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
  }

  &__amount {
    font-size: 14px;
    color: #ff5a5f;
  }
}

.deal {
  &__day {
    padding: 10px 15px 0;
    display: flex;
    justify-content: space-between;

    &__time,
    &__total {
      font-size: 13px;
      color: #999;
    }
  }
}

.add {
  height: 30px;
  line-height: 30px;
  color: @themeColor;
  border-radius: 15px;
  text-align: center;
  i {
    vertical-align: middle;
  }
}
</style>
