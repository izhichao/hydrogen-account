import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Snackbar, Dialog } from '@varlet/ui';
import { useCategoryStore } from '../store/useCategoryStore';
import { useDealStore } from '../store/useDealStore';
import { useTime } from './useTime';

export const useDeal = () => {
  const route = useRoute();
  const router = useRouter();

  const categoryStore = useCategoryStore();
  const { categoryList } = storeToRefs(categoryStore);

  const { type, id } = route.query;

  // 获取当前时间
  const { nowStr } = useTime();
  const { yearStr, monthStr, dayStr, hourStr, minuteStr } = nowStr();

  const dealModel = reactive({
    amount: '0',
    categoryId: 0,
    date: `${yearStr}-${monthStr}-${dayStr}`,
    time: `${hourStr}:${minuteStr}`,
    desc: ''
  });

  const dealStore = useDealStore();
  const { findDeal, addDeal, editDeal, deleteDeal } = dealStore;

  // 获取当前交易信息
  if (type === 'edit') {
    const deal = findDeal(+(id as string));
    dealModel.amount = (-(deal?.amount as number)).toString();
    dealModel.categoryId = deal?.categoryId as number;
    dealModel.date = deal?.date as string;
    dealModel.time = deal?.time as string;
    dealModel.desc = deal?.desc as string;
  }

  const handleAdd = () => {
    if (+dealModel.amount <= 0) {
      Snackbar('请输入正确的金额');
      return;
    }
    addDeal(dealModel.categoryId, dealModel.desc, +dealModel.amount, dealModel.date, dealModel.time);
    router.push({ name: 'Home' });
  };

  const handleEdit = () => {
    if (+dealModel.amount <= 0) {
      Snackbar('请输入正确的金额');
      return;
    }
    editDeal(+(id as string), dealModel.categoryId, dealModel.desc, +dealModel.amount, dealModel.date, dealModel.time);
    router.go(-1);
  };

  const handleDelete = () => {
    Dialog('确认删除').then((res) => {
      if (res === 'confirm') {
        deleteDeal(+(id as string));
        router.push({ name: 'Home' });
      }
    });
  };

  return {
    dealModel,
    categoryList,
    type,
    handleAdd,
    handleEdit,
    handleDelete
  };
};
