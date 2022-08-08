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
      <ListItem v-for="item in categoryListWithDesc" :item="item" :button="true">
        <var-icon name="cog" class="edit" color="#333" @click="handleShow(item.id)" />
        <var-icon name="delete" class="delete" color="#333" @click="handleDelete(item.id)" />
      </ListItem>
    </Card>

    <var-dialog v-model:show="editModel.status" @confirm="handleEdit">
      <var-input placeholder="请输入新的分类名" v-model="editModel.name" />
    </var-dialog>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';
import { useCategory } from '../composables/useCategory';
const { categoryListWithDesc, name, editModel, handleAdd, handleDelete, handleEdit, handleShow } = useCategory();
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
  font-size: 18px;
  margin-right: 15px;
}
.delete {
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
