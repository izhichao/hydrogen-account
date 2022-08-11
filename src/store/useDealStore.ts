import { defineStore } from 'pinia';
import { useCategoryStore } from './useCategoryStore';
import { Deal } from '../types/deal';
import { useGroup } from '../composables/useGroup';
const { convertListToGroup, convertObjToArray } = useGroup();

export const useDealStore = defineStore('deal', {
  state: () => {
    return {
      dealList: [
        { id: 0, name: '未分类', categoryId: 0, desc: '手机壳25/12:00', amount: -1, date: '2022-07-25', time: '12:00' },
        { id: 1, name: '未分类', categoryId: 2, desc: '手机壳23', amount: -2, date: '2022-07-23', time: '12:00' },
        { id: 2, name: '未分类', categoryId: 2, desc: '手机壳24', amount: -3, date: '2022-07-24', time: '12:00' },
        { id: 3, name: '未分类', categoryId: 1, desc: '手机壳23', amount: -4, date: '2022-07-22', time: '12:00' },
        { id: 4, name: '未分类', categoryId: 1, desc: '手机壳25/13:00', amount: -5, date: '2022-07-25', time: '13:00' },
        { id: 5, name: '未分类', categoryId: 1, desc: '手机壳08-01', amount: -5, date: '2022-08-01', time: '13:00' }
      ] as Deal[]
    };
  },
  getters: {
    // 添加分类名(更改原数组)
    dealListWithName: (state) => {
      const categoryList = useCategoryStore().categoryList;
      state.dealList.forEach((deal) => {
        const category = categoryList.find((category) => category.id === deal.categoryId);
        deal.name = category?.name || '未分类';
      });
      return state.dealList;
    },
    // 按日期与时间倒序排序
    orderDealList() {
      const dealListOrderByTime: Deal[] = JSON.parse(JSON.stringify(this.dealListWithName));
      dealListOrderByTime.sort((a, b) => {
        // 日期
        if (b.date > a.date) {
          return 1;
        } else if (b.date < a.date) {
          return -1;
        } else {
          // 时间
          if (b.time > a.time) {
            return 1;
          } else if (b.time < a.time) {
            return -1;
          } else {
            // id
            if (b.id > a.id) {
              return 1;
            } else if (b.id < a.id) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      });
      return dealListOrderByTime;
    },
    recentDealList(): Deal[] {
      return this.orderDealList.slice(0, 3);
    },
    dealAmount: (state) => {
      return state.dealList.length;
    },
    totalExpend: (state) => {
      return state.dealList.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
    },
    timeDiff(): number {
      const firstDay = this.orderDealList[this.orderDealList.length - 1].date;
      const lastDay = this.orderDealList[0].date;
      const days = (new Date(lastDay).getTime() - new Date(firstDay).getTime()) / (3600 * 24 * 1000);
      return days;
    }
  },
  actions: {
    // 根据日期过滤交易数据
    filterDealList(list: Deal[], time: string) {
      let dealList = list;
      if (time.length === 10) {
        dealList = list.filter((deal) => deal.date === time);
      } else if (time.length === 7) {
        dealList = list.filter((deal) => deal.date.slice(0, 7) === time);
      } else if (time.length === 4) {
        dealList = list.filter((deal) => deal.date.slice(0, 4) === time);
      }
      return dealList;
    },
    // 根据关键字过滤交易数据
    searchDealList(list: Deal[], keyword: string) {
      let dealList = list;
      dealList = dealList.filter((deal) => {
        return deal.desc.includes(keyword) || deal.name.includes(keyword) || deal.date.includes(keyword);
      });
      return dealList;
    },
    // 按日、月、年、类别分类
    dealListGroup(type: string, { time, keyword }: { time?: string; keyword?: string } = {}) {
      let list = this.orderDealList;
      if (time) {
        list = this.filterDealList(list, time);
      }
      if (keyword) {
        list = this.searchDealList(list, keyword);
      }
      const dealObj = convertListToGroup(list as Deal[], type);
      const dealList = convertObjToArray(dealObj);
      return dealList;
    },

    findDeal(id: number) {
      return this.dealList.find((deal) => deal.id === id);
    },
    addDeal(categoryId: number, desc: string, amount: number, date: string, time: string) {
      const newId = this.dealList[this.dealList.length - 1].id + 1;
      this.dealList.push({ id: newId, name: '未分类', categoryId, desc, amount: -amount, date, time });
    },
    editDeal(id: number, categoryId: number, desc: string, amount: number, date: string, time: string) {
      this.dealList.forEach((deal) => {
        if (deal.id === id) {
          deal.categoryId = categoryId;
          deal.desc = desc;
          deal.amount = -amount;
          deal.date = date;
          deal.time = time;
        }
        return deal;
      });
    },
    deleteDeal(id: number) {
      const newDealList = this.dealList.filter((deal) => {
        if (deal.id !== id) {
          return deal;
        }
      });
      this.dealList = newDealList;
    }
  },
  persist: true
});
