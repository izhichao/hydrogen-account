<template>
  <Header :title="title" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <!-- 交易统计 -->
      <template v-if="list === 'deal'">
        <Card :header="false">
          <ul>
            <li class="total">
              <div class="total__title">交易数</div>
              <div class="total__amount">{{ amount }}</div>
            </li>
            <li class="total">
              <div class="total__title">总支出</div>
              <div class="total__amount">{{ expend }}</div>
            </li>
          </ul>
        </Card>

        <div class="deal" v-for="item in dealList" :key="item.name">
          <div class="deal__day">
            <div class="deal__day__time">{{ item.name.replace('-', '年').replace('-', '月') + '日' }}</div>
            <div class="deal__day__total">{{ item.total }}</div>
          </div>

          <Card :header="false" :class="{ 'padding-small': item.value.length === 1 }">
            <ListItem
              v-for="subItem in item.value"
              :item="subItem"
              @more="router.push({ name: 'Detail', query: { type: 'edit', id: subItem.id } })"
            ></ListItem>
          </Card>
        </div>
      </template>

      <!-- 账户统计 -->
      <template v-else-if="list === 'account'">
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
            <var-icon name="plus" class="add__icon"/>
          </div>
        </Card>
      </template>

      <var-dialog v-model:show="editAccountModel.status" @confirm="handleEdit">
        <var-input placeholder="请输入新的账户名" v-model="editAccountModel.name" />
        <var-input placeholder="请输入余额" type="number" v-model.number="editAccountModel.amount" />
        <var-button text outline type="primary" size="mini" @click="handleDelete">删除</var-button>
      </var-dialog>

      <var-dialog v-model:show="addAccountModel.status" @confirm="handleAdd">
        <var-input placeholder="请输入新的账户名" v-model="addAccountModel.name" />
        <var-input placeholder="请输入余额" type="number" v-model.number="addAccountModel.amount" />
      </var-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { useDealStore } from '../store/useDealStore';
import { useRoute, useRouter } from 'vue-router';
import { useAccount } from '../composables/useAccount';
import { ref } from 'vue';
const route = useRoute();
const router = useRouter();
const dealStore = useDealStore();
const { dealListGroup } = dealStore;
const {
  addAccountModel,
  editAccountModel,
  accountList,
  accountAmount,
  totalAsset,
  handleShowAdd,
  handleAdd,
  handleShowEdit,
  handleEdit,
  handleDelete
} = useAccount();

const { list, time, keyword } = route.query;
const dealList = dealListGroup('day', { time: time as string, keyword: keyword as string });
const amount = dealList.reduce((total, item) => total + item.value.length, 0);
const expend = dealList.reduce((total, item) => total + item.total, 0);

const title = ref('所有账户');

if (keyword) {
  title.value = keyword as string;
} else if (time) {
  if (time.length === 10) {
    title.value = (time as string).replace('-', '年').replace('-', '月') + '日';
  } else {
    title.value = (time as string).replace('-', '年') + '月';
  }
} else if (list === 'deal') {
  title.value = '所有交易';
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
  &__icon {
    vertical-align: middle;
    font-size: 24px;
  }
}
</style>
