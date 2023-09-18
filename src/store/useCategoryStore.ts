import { defineStore } from 'pinia';
import { useDealStore } from './useDealStore';
import { BaseCategory, Category } from '../types';
export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [
        { id: 0, name: '餐饮' },
        { id: 1, name: '购物' },
        { id: 2, name: '水电费' },
        { id: 3, name: '交通' }
      ] as BaseCategory[]
    };
  },
  getters: {
    // 添加交易笔数统计
    categoryListWithDesc: (state) => {
      const dealList = useDealStore().dealList;
      return state.categoryList.map((category) => {
        const sum = dealList.filter((deal) => deal.categoryId === category.id).length;
        return { ...category, desc: `共${sum}笔交易` };
      }) as Category[];
    }
  },
  actions: {
    addCategory(name: string) {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, name });
    },
    deleteCategory(id: number) {
      this.categoryList.filter((category) => category.id !== id);
    },
    editCategory(id: number, name: string) {
      const category = this.categoryList.find((category) => category.id === id);
      if (category) {
        category.name = name;
      }
    }
  },
  persist: true
});
