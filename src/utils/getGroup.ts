import { Deal, DealGroup } from '../types';
import * as math from 'mathjs';

/**
 * 将数据进行分组(按日，按月，按分类)
 * @param list 待分组的数据
 * @param type day, month, year, category
 * @returns 对象形式的数据，key 为日期或分类，value 为数据列表
 * { 2022-09-10: Array(2), 2022-08-24: Array(1) }
 */
export const convertListToGroup = (list: Deal[], type: string) => {
  const dealObj: { [key: string]: Deal[] } = {};
  list.forEach((deal) => {
    let key: string = deal.date;
    // 1.根据不同类型指定 key
    if (type === 'day') {
      key = deal.date;
    } else if (type === 'month') {
      key = deal.date.slice(0, 7);
    } else if (type === 'year') {
      key = deal.date.slice(0, 4);
    } else {
      key = deal.name;
    }

    // 2.添加数据
    if (dealObj[key]) {
      dealObj[key].push(deal);
    } else {
      dealObj[key] = [deal];
    }
  });
  
  return dealObj;
};

/**
 * 将对象形式数据转换为数组形式，并添加统计
 * @param obj 对象形式的数据
 * @returns name: 日期或分类，value: 数据列表，total: 总金额
 * [{ name: '2022-09-10', total: -25.6, value: Array(2) }]
 */
export const convertObjToArray = (obj: { [key: string]: Deal[] }) => {
  const dealList: DealGroup[] = [];
  // 遍历对象的key(日期或者分类)
  for (const key in obj) {
    // 计算该日期或分类下的总金额
    const total = math.number(
      obj[key].reduce((total, currentValue) => {
        return math.add(math.bignumber(total), math.bignumber(currentValue.amount));
      }, math.bignumber(0))
    );
    dealList.push({ name: key, total, value: obj[key] });
  }
  
  return dealList;
};
