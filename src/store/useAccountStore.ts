import { defineStore } from 'pinia';
import { Account } from '../types/account';
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
    accountAmount: (state) => {
      return state.accountList.length;
    },
    totalAsset: (state) => {
      return math.number(
        state.accountList.reduce(
          (total, currentValue) => math.add(math.bignumber(total), math.bignumber(currentValue.amount)),
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
      const newAccountList = this.accountList.filter((account) => {
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
