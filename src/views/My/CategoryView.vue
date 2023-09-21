<template>
  <Header title="分类" :back="true"></Header>
  <div class="main-content">
    <div class="add">
      <input type="text" class="add__input" v-model="categoryModel.name" />
      <var-button size="small" text outline type="primary" @click="handleSwitch(categoryModel.type)">
        {{ categoryModel.text }}
      </var-button>
      <var-button type="primary" round @click="handleAdd(categoryModel.type)">
        <var-icon name="plus" />
      </var-button>
    </div>
    <template v-for="(list, key) in categoryLists">
      <Card :title="key === 'out' ? '支出' : '收入'" :more="false" v-if="list.length !== 0">
        <ListItem v-for="item in list" :key="item.id" :item="item" :button="true" :color="key ==='out' ? '': 'green'" @click="handlePush(item.name)">
          <var-icon name="cog" class="btn" @click.stop="handleShow(item.id)" />
          <var-icon name="delete" class="delete" @click.stop="handleDelete(item.id)" />
        </ListItem>
      </Card>
    </template>

    <var-dialog v-model:show="editModel.status" @confirm="handleEdit">
      <var-input placeholder="请输入新的分类名" v-model="editModel.name" />
    </var-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Header from '../../components/Header.vue';
import Card from '../../components/Card.vue';
import ListItem from '../../components/ListItem.vue';
import { useCategoryStore } from '../../store/useCategoryStore';
const categoryStore = useCategoryStore();
// 获取 store 中的数据及函数
const { categoryLists } = storeToRefs(categoryStore);
const { addCategory, deleteCategory, editCategory } = categoryStore;

// 切换类型
const categoryModel = ref({
  name: '',
  type: 'out',
  text: '支出'
});

const handleSwitch = (type: string) => {
  if (type === 'out') {
    categoryModel.value.type = 'in';
    categoryModel.value.text = '收入';
  } else {
    categoryModel.value.type = 'out';
    categoryModel.value.text = '支出';
  }
};

// 新增分类
const handleAdd = (type: string) => {
  if (!categoryModel.value.name) {
    Snackbar('请输入分类名称');
    return;
  }
  addCategory(categoryModel.value.name, type as 'in' | 'out');
  categoryModel.value.name = '';
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
    height: 32px;
    border-radius: 16px;
    border: none;
    outline: none;
    padding: 0 15px;
    font-size: 14px;
  }

  button {
    margin-left: 10px;
  }

  &__btn {
    background-color: @themeColor;
  }
}
</style>
