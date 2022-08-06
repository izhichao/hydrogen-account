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

        <div class="deal" v-for="item in dealListGroupByTime" :key="item.name">
          <div class="deal__day">
            <div class="deal__day__time">{{ item.name }}</div>
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
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useAccount } from '../composables/useAccount';
const route = useRoute();
const router = useRouter();
const dealStore = useDealStore();
const { dealListGroupByTime, dealAmount, totalExpend } = storeToRefs(dealStore);
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
