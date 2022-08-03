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

interface DealTime {
  date: string;
  total: number;
  value: Deal[];
}

export const useDealStore = defineStore('deal', {
  state: () => {
    return {
      dealList: [
        { id: 0, categoryId: 0, desc: '手机壳25/12:00', amount: -1, date: '2022-07-25', time: '12:00' },
        { id: 1, categoryId: 2, desc: '手机壳23', amount: -2, date: '2022-07-23', time: '12:00' },
        { id: 2, categoryId: 2, desc: '手机壳24', amount: -3, date: '2022-07-24', time: '12:00' },
        { id: 3, categoryId: 1, desc: '手机壳23', amount: -4, date: '2022-07-23', time: '12:00' },
        { id: 4, categoryId: 1, desc: '手机壳25/13:00', amount: -5, date: '2022-07-25', time: '13:00' }
      ] as Deal[]
    };
  },
  getters: {
    dealListWithName(state) {
      const categoryList = useCategoryStore().categoryList;
      const newDealList: Deal[] = JSON.parse(JSON.stringify(state.dealList));
      newDealList.forEach((deal) => {
        const category = categoryList.find((category) => category.id === deal.categoryId);
        deal.name = category?.name || '未分类';
      });
      // 按日期与时间倒序排序
      newDealList.sort((a, b) => {
        if (b.date > a.date) {
          return 1;
        } else if (b.date < a.date) {
          return -1;
        } else if (b.time > a.time) {
          return 1;
        } else if (b.time < a.time) {
          return -1;
        } else {
          return 0;
        }
      });
      return newDealList;
    },
    // 按时间分类
    dealTimeList() {
      // 将交易列表按日期归类
      const dealTimeObj: { [key: string]: Deal[] } = {};
      this.dealListWithName.forEach((deal) => {
        if (dealTimeObj[deal.date]) {
          dealTimeObj[deal.date].push(deal);
        } else {
          dealTimeObj[deal.date] = [deal];
        }
      });

      // 将对象转换为数组并添加今日总支出
      const dealTimeList: DealTime[] = [];
      for (const key in dealTimeObj) {
        const total = dealTimeObj[key].reduce((total, currentValue) => {
          return total + currentValue.amount;
        }, 0);
        dealTimeList.push({ date: key, total, value: dealTimeObj[key] });
      }

      return dealTimeList;
    },
    recentDealList() {
      const recentDealList: Deal[] = this.dealListWithName.slice(0, 3);
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
