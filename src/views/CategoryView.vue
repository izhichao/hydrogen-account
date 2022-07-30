<template>
  <Header title="分类" :back="true"></Header>
  <div class="main-content">
    <div class="add">
      <input type="text" class="add__input" v-model="title" />
      <var-button type="primary" round class="add__btn" @click="handleAdd">
        <var-icon name="plus" />
      </var-button>
    </div>
    <Card :header="false">
      <ListItem v-for="item in categoryList" :item="item" :button="true">
        <var-icon name="cog " size="18" class="edit" color="#333" @click="handleEdit(item.id)" />
        <var-icon name="delete" size="18" class="delete" color="#333" @click="handleDelete(item.id)" />
      </ListItem>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { useCategoryStore } from '../store/useCategoryStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Dialog, Snackbar } from '@varlet/ui';
const categoryStore = useCategoryStore();
const { categoryList } = storeToRefs(categoryStore);
const { addCategory, deleteCategory } = categoryStore;

const title = ref('');
const handleAdd = () => {
  if (!title.value) {
    Snackbar('请输入分类名称');
    return;
  }
  addCategory(title.value);
  title.value = '';
};

const handleEdit = (id: number) => {
  console.log(id);
};

const handleDelete = (id: number) => {
  Dialog('确认删除').then((res) => {
    if (res === 'confirm') {
      deleteCategory(id);
    }
  });
};
</script>

<style lang="less" scoped>
@import '../style/variables.less';
.main-content {
  top: 50px;
  bottom: 0;
}
.header {
  padding: 0 20px;
  background-image: @linearColor;
}

.edit {
  margin-right: 15px;
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
