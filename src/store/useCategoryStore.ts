import { defineStore } from 'pinia';
import { useDealStore } from './useDealStore';
import { BaseCategory, Category } from '../types';
import deepClone from '../utils/deepClone';
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
      const categoryListWithDesc: Category[] = deepClone(state.categoryList);
      const dealList = useDealStore().dealList;
      categoryListWithDesc.forEach((category) => {
        let sum = 0;
        dealList.forEach((deal) => {
          if (deal.categoryId === category.id) {
            sum++;
          }
        });
        category.desc = `共${sum}笔交易`;
      });
      return categoryListWithDesc;
    }
  },
  actions: {
    addCategory(name: string) {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, name });
    },
    deleteCategory(id: number) {
      const newCategoryList = this.categoryList.filter((category) => {
        if (category.id !== id) {
          return category;
        }
      });
      this.categoryList = newCategoryList;
    },
    editCategory(id: number, name: string) {
      this.categoryList.forEach((category) => {
        if (category.id === id) {
          category.name = name;
        }
        return category;
      });
    }
  },
  persist: true
});
