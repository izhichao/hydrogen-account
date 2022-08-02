import { defineStore } from 'pinia';

export const useDealStore = defineStore('deal', {
  state: () => {
    return {
      dealList: [
        { id: 0, name: 0, desc: '手机壳', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 1, name: 2, desc: '手机壳1', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 2, name: 1, desc: '手机壳2', amount: -4.58, date: '2022-07-25', time: '12:00' }
      ]
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
    dealAmount(state) {
      return state.dealList.length;
    },
    totalExpend(state) {
      return state.dealList.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
    }
  },
  actions: {}
});
