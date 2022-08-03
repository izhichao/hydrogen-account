import { defineStore } from 'pinia';
import { useDealStore } from './useDealStore';

export interface Category {
  id: number;
  name: string;
  desc?: string;
}

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [
        { id: 0, name: '购物' },
        { id: 1, name: '水电费' },
        { id: 2, name: '交通' }
      ] as Category[]
    };
  },
  getters: {
    categoryListWithDesc: (state) =>  {
      const dealList = useDealStore().dealList;
      const newCategoryList: Category[] = JSON.parse(JSON.stringify(state.categoryList));
      newCategoryList.forEach((category) => {
        let sum = 0;
        dealList.forEach((deal) => {
          if (deal.categoryId === category.id) {
            sum++;
          }
          category.desc = `共${sum}笔交易`;
        });
      });
      return newCategoryList;
    }
  },
  actions: {
    addCategory(name: string) {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, name });
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
  }
  // persist: true
});
