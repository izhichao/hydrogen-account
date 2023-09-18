import { defineStore } from 'pinia';
import { Account } from '../types';
import * as math from 'mathjs';

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      accountList: [
        { id: 0, name: '支付宝', amount: 300 },
        { id: 1, name: '微信', amount: 200 }
      ] as Account[]
    };
  },
  getters: {
    accountAmount: (state) => state.accountList.length,
    totalAsset: (state) => {
      return math.number(
        state.accountList.reduce(
          (total, item) => math.add(math.bignumber(total), math.bignumber(item.amount)),
          math.bignumber(0)
        )
      );
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
      this.accountList = this.accountList.filter((account) => account.id !== id);
    },
    editAccount(id: number, name: string, amount: number) {
      const account = this.findAccount(id);
      if (account) {
        account.name = name;
        account.amount = amount;
      }
    }
  },
  persist: true
});
