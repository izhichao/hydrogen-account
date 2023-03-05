import { useCategoryStore } from '../store/useCategoryStore';
import { reactive, ref } from 'vue';
import { Dialog, Snackbar } from '@varlet/ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export const useCategory = () => {
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

  return {
    categoryListWithDesc,
    name,
    editModel,
    handleAdd,
    handleDelete,
    handleEdit,
    handleShow,
    handlePush
  };
};
