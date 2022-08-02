import { Dialog, Snackbar } from '@varlet/ui';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
import { useAccountStore } from '../store/useAccountStore';

export const useAccount = () => {
  const accountStore = useAccountStore();
  const { accountList, accountAmount, totalAsset } = storeToRefs(accountStore);
  const { addAccount, findAccount, editAccount, deleteAccount } = accountStore;

  // 新增账户
  const addAccountModel = reactive({
    name: '',
    amount: '',
    status: false
  });

  const handleShowAdd = () => {
    addAccountModel.status = true;
  };

  const handleAdd = () => {
    if (!addAccountModel.name || !addAccountModel.amount) {
      Snackbar('请输入账户名与余额');
      return;
    }
    addAccount(addAccountModel.name, +addAccountModel.amount);
    addAccountModel.name = '';
    addAccountModel.amount = '';
  };

  // 编辑账户
  const editAccountModel = reactive({
    id: 0,
    name: '',
    amount: '',
    status: false
  });

  const handleShowEdit = (id: number) => {
    const account = findAccount(id);
    editAccountModel.status = true;
    editAccountModel.id = id;
    editAccountModel.name = account?.name as string;
    editAccountModel.amount = account?.amount?.toString() as string;
  };

  const handleEdit = () => {
    editAccount(editAccountModel.id, editAccountModel.name, +editAccountModel.amount);
  };

  // 删除账户
  const handleDelete = () => {
    Dialog('确认删除').then((res) => {
      if (res === 'confirm') {
        deleteAccount(editAccountModel.id);
        editAccountModel.status = false;
      }
    });
  };

  return {
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
  };
};
