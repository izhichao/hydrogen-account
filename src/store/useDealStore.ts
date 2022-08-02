import { defineStore } from 'pinia';
import { useCategoryStore } from './useCategoryStore';

export interface Deal {
  id: number;
  name?: string;
  categoryId: number;
  desc: string;
  amount: number;
  date: string;
  time: string;
}

export const useDealStore = defineStore('deal', {
  state: () => {
    return {
      dealList: [
        { id: 0, categoryId: 0, desc: '手机壳0', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 1, categoryId: 2, desc: '手机壳1', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 2, categoryId: 2, desc: '手机壳2', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 3, categoryId: 1, desc: '手机壳3', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 4, categoryId: 1, desc: '手机壳4', amount: -4.58, date: '2022-07-25', time: '12:00' }
      ] as Deal[]
    };
  },
  getters: {
    // 按时间分类
    dealTimeList() {
      return {
        20220725: [{ id: 1, name: '购物', amount: -4.58 }],
        20220726: [
          { id: 0, name: '购物', desc: '手机壳', amount: -4.58 },
          { id: 2, name: '购物', amount: -4.58 },
          { id: 1, name: '购物', desc: '手机壳', amount: -4.58 }
        ]
      };
    },
    dealListWithName(state) {
      const categoryList = useCategoryStore().categoryList;
      const newDealList: Deal[] = JSON.parse(JSON.stringify(state.dealList));
      newDealList.forEach((deal) => {
        const category = categoryList.find((category) => category.id === deal.categoryId);
        deal.name = category?.name || '未分类';
      });
      return newDealList;
    },
    recentDealList() {
      const recentDealList: Deal[] = this.dealListWithName.slice(this.dealList.length - 3, this.dealList.length).reverse();
      return recentDealList;
    },
    dealAmount(state) {
      return state.dealList.length;
    },
    totalExpend(state) {
      return state.dealList.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
    }
  },
  actions: {}
});
