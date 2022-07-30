import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [
        { id: 0, name: '购物', desc: '共10条交易' },
        { id: 1, name: '水电费', desc: '共100条交易' },
        { id: 2, name: '交通', desc: '共99条交易' }
      ]
    };
  },
  getters: {},
  actions: {
    addCategory(name: string) {
      const newId = this.categoryList[this.categoryList.length - 1].id + 1;
      this.categoryList.push({ id: newId, name, desc: '共10条交易' });
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
