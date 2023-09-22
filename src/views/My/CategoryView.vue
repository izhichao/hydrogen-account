<template>
  <Header title="分类" :back="true"></Header>
  <div class="main-content">
    <var-space justify="space-around">
      <var-button
        class="switch-btn"
        :type="categoryModel.type === 'out' ? 'primary' : 'default'"
        @click="handleSwitch('out')"
      >
        支出
      </var-button>
      <var-button
        class="switch-btn"
        :type="categoryModel.type === 'in' ? 'primary' : 'default'"
        @click="handleSwitch('in')"
      >
        收入
      </var-button>
    </var-space>

    <div class="add">
      <input type="text" class="add__input" v-model="categoryModel.name" />
      <var-button type="primary" round @click="handleAdd(categoryModel.type)">
        <var-icon name="plus" />
      </var-button>
    </div>

    <template v-for="(list, key) in categoryLists">
      <Card :title="key === 'out' ? '支出' : '收入'" :more="false" v-if="list.length !== 0">
        <ListItem
          v-for="item in list"
          :key="item.id"
          :item="item"
          :button="true"
          :color="key === 'out' ? 'red' : 'blue'"
          @click="handlePush(item.name)"
        >
          <var-icon name="cog" class="btn" @click.stop="handleShow(item.id)" />
          <var-icon name="delete" class="delete" @click.stop="handleDelete(item.id)" />
        </ListItem>
      </Card>
    </template>

    <var-dialog v-model:show="categoryModel.status" @confirm="handleEdit">
      <var-input placeholder="请输入新的分类名" v-model="categoryModel.name" />
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

// Model
const categoryModel = reactive({
  id: 0,
  name: '',
  type: 'out',
  status: false
});

// 切换类型
const handleSwitch = (type: string) => {
  categoryModel.type = type;
};

// 新增分类
const handleAdd = (type: string) => {
  if (!categoryModel.name) {
    Snackbar('请输入分类名称');
    return;
  }
  addCategory(categoryModel.name, type as 'in' | 'out');
  categoryModel.name = '';
};

// 编辑分类名称
const handleShow = (id: number) => {
  categoryModel.status = true;
  categoryModel.id = id;
};

const handleEdit = () => {
  if (!categoryModel.name) {
    Snackbar('请输入新的分类名称');
    return;
  }
  editCategory(categoryModel.id, categoryModel.name);
  categoryModel.name = '';
  categoryModel.status = false;
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
@import '../../style/inner.css';
.var-space {
  margin-top: 10px !important;
}

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
    background-color: var(--themeColor);
  }
}
</style>
