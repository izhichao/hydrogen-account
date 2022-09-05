import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      show: {
        category: true,
        day: true,
        month: true,
        year: true
      }
    };
  },
  persist: true
});
