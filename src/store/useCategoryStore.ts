import { defineStore } from 'pinia';
import { useDealStore } from './useDealStore';

export interface Category {
  id: number;
  name: string;
  desc: string;
}

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [
        { id: 0, name: '购物', desc: '共0笔交易' },
        { id: 1, name: '水电费', desc: '共0笔交易' },
        { id: 2, name: '交通', desc: '共0笔交易' }
      ] as Category[]
    };
  },
  getters: {
    // 添加交易笔数统计（更改原数组）
    categoryListWithDesc: (state) => {
      const dealList = useDealStore().dealList;
      // const newCategoryList: Category[] = JSON.parse(JSON.stringify(state.categoryList));
      state.categoryList.forEach((category) => {
        let sum = 0;
        dealList.forEach((deal) => {
          if (deal.categoryId === category.id) {
            sum++;
          }
        });
        category.desc = `共${sum}笔交易`;
      });
      return state.categoryList;
    }
  },
  actions: {
    addCategory(name: string) {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, name, desc: '共0笔交易' });
    },
    deleteCategory(id: number) {
      let newCategoryList = this.categoryList.filter((category) => {
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
