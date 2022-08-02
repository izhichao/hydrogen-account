<template>
  <Header :title="route.query.type === 'deal' ? '所有交易' : '所有账户'" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <!-- 交易统计 -->
      <template v-if="route.query.type === 'deal'">
        <Card :header="false">
          <ul>
            <li class="total">
              <div class="total__title">交易数</div>
              <div class="total__amount">{{ dealAmount }}</div>
            </li>
            <li class="total">
              <div class="total__title">总支出</div>
              <div class="total__amount">{{ totalExpend }}</div>
            </li>
          </ul>
        </Card>

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
      <template v-else-if="route.query.type === 'account'">
        <Card :header="false">
          <ul>
            <li class="total">
              <div class="total__title">账户数</div>
              <div class="total__amount">{{ accountAmount }}</div>
            </li>
            <li class="total">
              <div class="total__title">总支出</div>
              <div class="total__amount">{{ totalAsset }}</div>
            </li>
          </ul>
        </Card>

        <Card :header="false" class="padding-small">
          <ListItem v-for="item in accountList" :item="item" @click="handleShowEdit(item.id)"></ListItem>

          <div class="add" v-ripple @click="handleShowAdd">
            <var-icon name="plus" :size="24" />
          </div>
        </Card>
      </template>

      <var-dialog v-model:show="editModel.status" @confirm="handleEdit">
        <var-input placeholder="请输入新的账户名" v-model="editModel.name" />
        <var-input placeholder="请输入余额" type="number" v-model.number="editModel.amount" />
      </var-dialog>

      <var-dialog v-model:show="addModel.status" @confirm="handleAdd">
        <var-input placeholder="请输入新的账户名" v-model="addModel.name" />
        <var-input placeholder="请输入余额" type="number" v-model.number="addModel.amount" />
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
const itemStore = useItemStore();
const { accountList, dealList, dealTimeList, dealAmount, accountAmount, totalExpend, totalAsset } = storeToRefs(itemStore);
const { addAccount, findAccount, editAccount, deleteAccount } = itemStore;

const editModel = reactive({
  id: 0,
  name: '',
  amount: '',
  status: false
});

const handleShowEdit = (id: number) => {
  const account = findAccount(id);
  editModel.status = true;
  editModel.id = id;
  editModel.name = account?.name as string;
  editModel.amount = account?.amount?.toString() as string;
};

const handleEdit = () => {
  editAccount(editModel.id, editModel.name, +editModel.amount);
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
