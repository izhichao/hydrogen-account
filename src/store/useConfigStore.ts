import { defineStore } from 'pinia';
import { Show } from '../types/config';

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      show: {
        category: true,
        day: true,
        month: true,
        year: true
      } as Show
    };
  },
  persist: true
});
