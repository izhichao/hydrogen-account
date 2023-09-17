import { defineStore } from 'pinia';
import { useCategoryStore } from './useCategoryStore';
import { BaseDeal, Deal } from '../types';
import { getGroupList } from '../utils/getGroupList';
import deepClone from '../utils/deepClone';
import * as math from 'mathjs';

export const useDealStore = defineStore('deal', {
  state: () => {
    return {
      dealList: [
        { id: 0, categoryId: 1, desc: '手机壳', amount: -0.1, date: '2022-07-22', time: '12:00' },
        { id: 1, categoryId: 1, desc: '钢化膜', amount: -0.2, date: '2022-07-23', time: '12:00' },
        { id: 2, categoryId: 0, desc: '', amount: -23, date: '2022-08-24', time: '12:00' },
        { id: 3, categoryId: 0, desc: '', amount: -12, date: '2022-08-22', time: '12:00' },
        { id: 4, categoryId: 0, desc: '', amount: -13.1, date: '2022-09-10', time: '13:00' },
        { id: 5, categoryId: 0, desc: '', amount: -12.5, date: '2022-09-10', time: '13:00' }
      ] as BaseDeal[]
    };
  },
  getters: {
    // 添加分类名
    dealListWithName: (state) => {
      const dealList: Deal[] = deepClone(state.dealList);
      const categoryList = useCategoryStore().categoryList;
      dealList.forEach((deal) => {
        const category = categoryList.find((category) => category.id === deal.categoryId);
        deal.name = category?.name || '未分类';
      });
      return dealList;
    },
    // 按日期与时间倒序排序
    orderDealList() {
      const dealList: Deal[] = deepClone(this.dealListWithName);
      dealList.sort((a, b) => {
        const dateComparison = new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime();
        if (dateComparison !== 0) {
          return dateComparison;
        }
        // 时间相同则比较id
        return b.id - a.id;
      });
      return dealList;
    },
    dealAmount: (state) => {
      return state.dealList.length;
    },
    totalExpend: (state) => {
      return math.number(
        state.dealList.reduce(
          (total, item) => math.add(math.bignumber(total), math.bignumber(item.amount)),
          math.bignumber(0)
        )
      );
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
    filterByTime(dealList: Deal[], time: string) {
      return dealList.filter((deal) => deal.date.slice(0, time.length) === time);
    },
    // 根据关键字过滤交易数据
    filterByKeyword(dealList: Deal[], keyword: string) {
      return dealList.filter((deal) => {
        return deal.desc.includes(keyword) || deal.name?.includes(keyword) || deal.date.includes(keyword);
      });
    },
    // 按日、月、年、类别分类
    dealListGroup(type: string, { time, keyword }: { time?: string; keyword?: string } = {}) {
      let list = this.orderDealList;
      time && (list = this.filterByTime(list, time));
      keyword && (list = this.filterByKeyword(list, keyword));
      return getGroupList(list, type);
    },
    findDeal(id: number) {
      return this.dealList.find((deal) => deal.id === id);
    },
    addDeal(categoryId: number, desc: string, amount: number, date: string, time: string) {
      const newId = this.dealList[this.dealList.length - 1].id + 1;
      this.dealList.push({ id: newId, categoryId, desc, amount: -amount, date, time });
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
      this.dealList = this.dealList.filter((deal) => deal.id !== id);
    }
  },
  persist: true
});
