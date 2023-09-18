<template>
  <Header title="分类" :back="true"></Header>
  <div class="main-content">
    <div class="add">
      <input type="text" class="add__input" v-model="name" />
      <var-button type="primary" round class="add__btn" @click="handleAdd">
        <var-icon name="plus" />
      </var-button>
    </div>
    <Card :header="false">
      <ListItem
        v-for="item in categoryListWithDesc"
        :key="item.id"
        :item="item"
        :button="true"
        @click="handlePush(item.name)"
      >
        <var-icon name="cog" class="btn" @click.stop="handleShow(item.id)" />
        <var-icon name="delete" class="delete" @click.stop="handleDelete(item.id)" />
      </ListItem>
    </Card>

    <var-dialog v-model:show="editModel.status" @confirm="handleEdit">
      <var-input placeholder="请输入新的分类名" v-model="editModel.name" />
    </var-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Dialog, Snackbar } from '@varlet/ui';
import Header from '../../components/Header.vue';
import Card from '../../components/Card.vue';
import ListItem from '../../components/ListItem.vue';
import { useCategoryStore } from '../../store/useCategoryStore';
const categoryStore = useCategoryStore();
// 获取store中的数据及函数
const { categoryListWithDesc } = storeToRefs(categoryStore);
const { addCategory, deleteCategory, editCategory } = categoryStore;

// 新增分类
const name = ref('');
const handleAdd = () => {
  if (!name.value) {
    Snackbar('请输入分类名称');
    return;
  }
  addCategory(name.value);
  name.value = '';
};

// 编辑分类名称
const editModel = reactive({
  id: 0,
  name: '',
  status: false
});

const handleShow = (id: number) => {
  editModel.status = true;
  editModel.id = id;
};

const handleEdit = () => {
  if (!editModel.name) {
    Snackbar('请输入新的分类名称');
    return;
  }
  editCategory(editModel.id, editModel.name);
  editModel.name = '';
  editModel.status = false;
};

// 删除分类
const handleDelete = (id: number) => {
  Dialog('确认删除').then((res) => {
    if (res === 'confirm') {
      deleteCategory(id);
    }
  });
};

// 展示该分类下的所有交易
const router = useRouter();
const handlePush = (name: string) => {
  router.push({ name: 'List', query: { list: 'deal', keyword: name } });
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/inner.less';

.btn {
  &:first-child {
    margin-right: 15px;
  }
  font-size: 18px;
}

.add {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  &__input {
    flex: 1;
    margin: 0 10px 0 0;
    height: 32px;
    border-radius: 16px;
    border: none;
    outline: none;
    padding: 0 15px;
    font-size: 14px;
  }

  &__btn {
    background-color: @themeColor;
  }
}
</style>
