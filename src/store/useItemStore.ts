import { defineStore } from 'pinia';

interface Item {
  id: number;
  name: string;
  desc?: string;
  amount?: number;
  date?: string;
  time?: string;
}

export const useItemStore = defineStore('item', {
  state: () => {
    return {
      dealList: [
        { id: 0, name: '购物', desc: '手机壳', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 1, name: '购物', desc: '手机壳1', amount: -4.58, date: '2022-07-25', time: '12:00' },
        { id: 2, name: '购物', desc: '手机壳2', amount: -4.58, date: '2022-07-25', time: '12:00' }
      ] as Item[],
      accountList: [
        { id: 0, name: '支付宝', amount: 5000 },
        { id: 1, name: '微信', amount: 5000 }
      ] as Item[]
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
    accountAmount(state) {
      return state.accountList.length;
    },
    totalExpend(state) {
      return state.dealList.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
    },
    totalAsset(state) {
      return state.accountList.reduce((total, currentValue) => total + (currentValue.amount as number), 0);
    }
  },
  actions: {
    addAccount(name: string, amount: number) {
      const newId = this.accountList[this.accountList.length - 1].id + 1;
      this.accountList.push({ id: newId, name, amount });
    },
    findAccount(id: number) {
      return this.accountList.find((account) => account.id === id);
    },
    deleteAccount(id: number) {
      let newAccountList = [];
      newAccountList = this.accountList.filter((account) => {
        if (account.id !== id) {
          return account;
        }
      });
      this.accountList = newAccountList;
    },
    editAccount(id: number, name: string, amount: number) {
      this.accountList.forEach((account) => {
        if (account.id === id) {
          account.name = name;
          account.amount = amount;
        }
        return account;
      });
    }
  },
  persist: true
});
