import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [
        { id: 0, title: '购物', desc: '共10条交易' },
        { id: 1, title: '水电费', desc: '共100条交易' },
        { id: 2, title: '交通', desc: '共99条交易' }
      ]
    };
  },
  getters: {},
  actions: {
    addCategory(title: string) {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, title, desc: '共10条交易' });
    },
    deleteCategory(id: number) {
      let newCategoryList = [];
      newCategoryList = this.categoryList.filter((category) => {
        if (category.id !== id) {
          return category;
        }
      });
      this.categoryList = newCategoryList;
    },
    editCategory(id: number, title: string) {
      let newCategoryList = [];
      newCategoryList = this.categoryList.map((category) => {
        if (category.id === id) {
          category.title = title;
        }
        return category;
      });
    }
  },
  persist: true
});
