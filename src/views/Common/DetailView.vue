<template>
  <Header title="支出" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :header="false">
        <var-form ref="form">
          <var-space direction="column" :size="[15, 0]">
            <div>
              <div class="form__title">支出</div>
              <var-input :hint="false" v-model="dealModel.amount" type="number" />
            </div>
            <div>
              <div class="form__title">分类</div>
              <div class="form__category">
                <label
                  v-for="item in categoryList"
                  :class="{
                    form__category__label: true,
                    'form__category__label--active': item.id === dealModel.categoryId
                  }"
                  :for="item.id.toString()"
                  :key="item.id"
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
              <var-input :hint="false" placeholder="轻敲添加备注" v-model="dealModel.desc" clearable />
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Header from '../../components/Header.vue';
import Card from '../../components/Card.vue';
import { useDeal } from '../../composables/useDeal';
const { dealModel, categoryList, type, handleAdd, handleEdit, handleDelete } = useDeal();

const showDate = ref(false);
const showTime = ref(false);

const handleDate = () => {
  setTimeout(() => {
    showDate.value = false;
  }, 50);
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/inner.less';

.form {
  &__title {
    font-size: 12px;
    color: #999;
  }

  &__content {
    height: 32px;
    line-height: 32px;
    color: #555;
    border-bottom: 1px solid #888;
  }

  &__btn {
    // margin: 0 ;
    text-align: center;
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
      color: #555;
      text-align: center;
      border: 1px solid @borderColor;
      border-radius: 15px;

      &--active {
        color: #ff6c7a;
        border: 1px solid #ff6c7a;
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