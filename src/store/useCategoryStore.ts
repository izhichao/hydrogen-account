import { defineStore } from 'pinia';
import { useDealStore } from './useDealStore';
import { BaseCategory, Category } from '../types';
export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [
        { id: 0, name: '餐饮', type: 'out' },
        { id: 1, name: '购物', type: 'out' },
        { id: 2, name: '水电费', type: 'out' },
        { id: 3, name: '交通', type: 'out' },
        { id: 4, name: '工资', type: 'in' },
        { id: 5, name: '股票分红', type: 'in' }
      ] as BaseCategory[]
    };
  },
  getters: {
    // 添加交易笔数统计
    categoryLists: (state) => {
      const dealList = useDealStore().dealList;
      const list = state.categoryList.map((category) => {
        const sum = dealList.filter((deal) => deal.categoryId === category.id).length;
        return { ...category, desc: `共${sum}笔交易` };
      });
      // 按收入和支出分类
      const categoryLists = list.reduce(
        (result: { in: Category[]; out: Category[] }, category: Category) => {
          if (category.type === 'in') {
            result.in.push(category);
          } else if (category.type === 'out') {
            result.out.push(category);
          }
          return result;
        },
        { out: [], in: [] }
      );

      return categoryLists;
    }
  },
  actions: {
    addCategory(name: string, type: 'in' | 'out') {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, name, type });
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
