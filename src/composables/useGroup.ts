import { Deal, DealGroup } from '../types/deal';

export const useGroup = () => {
  /**
   * 将数据进行分组(按日，按月，按分类)
   * @param list 待分组的数据
   * @param type day,month,year,category
   * @returns 对象形式的数据，key为日期或分类，value为数据列表
   */
  const convertListToGroup = (list: Deal[], type: string) => {
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
        case 'year':
          const year = deal.date.slice(0, 4);
          if (dealObj[year]) {
            dealObj[year].push(deal);
          } else {
            dealObj[year] = [deal];
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
    return dealObj;
  };
  /**
   * 将对象形式数据转换为数组形式，并添加统计
   * @param obj 对象形式的数据
   * @returns name: 日期或分类，value: 数据列表，total: 总金额
   */
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
  return {
    convertListToGroup,
    convertObjToArray
  };
};
