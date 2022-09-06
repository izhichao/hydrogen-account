import { ref } from 'vue';
import { Dialog, Snackbar } from '@varlet/ui';
import { Deal } from '../types/deal';
import { Category } from '../types/category';
import { Account } from '../types/account';
import { Show } from '../types/config';
import reloadTimer from '../utils/reloadTimer';
import getNow from '../utils/getNow';

export const useSelect = () => {
  const inRef = ref();

  const handleIn = () => {
    // 点击导入
    inRef.value.click();
    // 上传文件后，获取文件内容
    inRef.value.onchange = () => {
      const file = inRef.value.files[0];
      // 若文件不为JSON格式，则提示错误
      if (file.type !== 'application/json') {
        Snackbar.error({
          content: '请上传JSON文件',
          duration: 2000
        });
        return;
      }
      // 获取文件内容
      const reader = new FileReader();
      reader.readAsText(file, 'utf-8');
      reader.onload = (res) => {
        try {
          const json = JSON.parse(res.target?.result as string);
          const { account, category, config, deal } = json;
          account && localStorage.setItem('account', JSON.stringify(account));
          category && localStorage.setItem('category', JSON.stringify(category));
          config && localStorage.setItem('config', JSON.stringify(config));
          deal && localStorage.setItem('deal', JSON.stringify(deal));
          Snackbar.success({
            content: '导入成功',
            duration: 1500
          });
          reloadTimer(1500);
        } catch (e) {
          Snackbar.error({
            content: 'JSON文件格式错误',
            duration: 2000
          });
        }
      };
    };
  };

  const handleOut = () => {
    const { yearStr, monthStr, dayStr } = getNow();
    // 创建一个对象用于存储数据
    let obj: {
      config?: Show;
      category?: Category[];
      account?: Account[];
      deal?: Deal[];
    } = {};
    const config = localStorage.getItem('config');
    const category = localStorage.getItem('category');
    const account = localStorage.getItem('account');
    const deal = localStorage.getItem('deal');

    if (config) {
      obj.config = JSON.parse(config);
    }
    if (category) {
      obj.category = JSON.parse(category);
    }
    if (account) {
      obj.account = JSON.parse(account);
    }
    if (deal) {
      obj.deal = JSON.parse(deal);
    }
    // 创建一个a标签用于下载
    const data = JSON.stringify(obj);
    const blob = new Blob([data], { type: 'text/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `H2记账_${yearStr}年${monthStr}月${dayStr}日.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    Dialog('数据将无法恢复！确认清空？').then((res) => {
      if (res === 'confirm') {
        localStorage.clear();
        Snackbar.success({
          content: '清空成功',
          duration: 1500
        });
        reloadTimer(1500);
      }
    });
  };

  const handleShare = () => {
    if (!navigator.share) {
      alert('您的浏览器不支持分享功能！');
    } else {
      navigator.share({
        title: 'H2记账',
        url: window.location.href.replace(window.location.hash, ''),
        text: '轻量级记账神器，记录您的每一笔交易！'
      });
    }
  };
  return {
    inRef,
    handleClear,
    handleIn,
    handleOut,
    handleShare
  };
};
