import { Deal, DealGroup } from '../types/deal';

export const useDeal = () => {
  // 将数据进行分组(按日，按月，按分类)
  const converListToGroup = (list: Deal[], type: string) => {
    const dealObj: { [key: string]: Deal[] } = {};
    list.forEach((deal) => {
      switch (type) {
        case 'day':
          if (dealObj[deal.date]) {
            dealObj[deal.date].push(deal);
          } else {
            dealObj[deal.date] = [deal];
          }
          break;
        case 'month':
          const month = deal.date.slice(0, 7);
          if (dealObj[month]) {
            dealObj[month].push(deal);
          } else {
            dealObj[month] = [deal];
          }
          break;
        case 'category':
          if (dealObj[deal.name]) {
            dealObj[deal.name].push(deal);
          } else {
            dealObj[deal.name] = [deal];
          }
          break;
      }
    });
  };
  // 将分组的数据转换为数组形式，并添加统计
  const convertObjToArray = (obj: { [key: string]: Deal[] }) => {
    const dealList: DealGroup[] = [];
    for (const key in obj) {
      const total = obj[key].reduce((total, currentValue) => {
        return total + currentValue.amount;
      }, 0);
      dealList.push({ name: key, total, value: obj[key] });
    }
    return dealList;
  };
};
