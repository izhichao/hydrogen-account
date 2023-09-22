import { Deal, DealGroup } from '../types';
import * as math from 'mathjs';

/**
 * 将数据进行分组(按日，按月，按年，按分类)
 * @param list 待分组的数据
 * @param type day, month, year, category
 * @returns name: 日期或分类，value: 数据列表，total: 总金额
 */
export const getGroupList = (list: Deal[], type: string) => {
  // 类似 { 2022-09-10: Array(2), 2022-08-24: Array(1) }
  const dealObj: { [key: string]: Deal[] } = {};

  // 1.映射：根据不同类型指定 key
  const keyMappings: { [key: string]: (deal: Deal) => string } = {
    day: (deal: Deal) => deal.date,
    month: (deal: Deal) => deal.date.slice(0, 7),
    year: (deal: Deal) => deal.date.slice(0, 4),
    category: (deal: Deal) => deal.name!
  };

  // 2.添加数据
  list.forEach((deal) => {
    const key: string = keyMappings[type](deal);
    if (!dealObj[key]) {
      dealObj[key] = [];
    }
    dealObj[key].push(deal);
  });

  // 3.对象转换为数组形式
  // 类似 [{ name: '2022-09-10', total: -25.6, value: Array(2) }]
  const dealList: DealGroup[] = [];
  // 4.遍历对象的 key (日期或者分类)
  for (const key in dealObj) {
    const total = math.number(
      dealObj[key].reduce(
        (total, item) => math.add(math.bignumber(total), math.bignumber(item.amount)),
        math.bignumber(0)
      )
    );
    dealList.push({ name: key, total, value: dealObj[key] });
  }

  return dealList;
};

export default getGroupList;