import { useDealStore } from '../store/useDealStore';
import { PieChart } from '../types/chart';
import convertPx from '../utils/convertPx';
const { timeDiff, dealListGroup } = useDealStore();

export const useChart = () => {
  /**
   * 分类统计
   * @param time time 时间，格式：yyyy或yyyy-MM
   * @returns
   */
  const categoryOptions = (time: string) => {
    let amount = 0;
    const data: PieChart[] = [];

    dealListGroup('category', { time }).forEach((item) => {
      amount += item.value.length;
      data.push({
        name: item.name,
        value: -item.total
      });
    });

    return {
      tooltip: { trigger: 'item' },
      title: [
        {
          x: convertPx(153),
          y: convertPx(40),
          textAlign: 'center',
          textStyle: {
            fontSize: convertPx(12),
            color: '#666'
          },
          subtextStyle: {
            fontSize: convertPx(16),
            align: 'center',
            color: '#333'
          },
          text: '交易笔数',
          subtext: amount || '0'
        }
      ],
      series: [
        {
          name: '分类统计',
          type: 'pie',
          radius: ['60%', '90%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          data
        }
      ]
    };
  };

  /**
   * 月支出（日趋势）
   * @param time 时间，格式：yyyy-MM
   * @returns
   */
  const dayOptions = (time: string) => {
    // 获取一个月的天数
    const [year, month] = time.split('-');
    const totalDays = new Date(+year, +month, 0).getDate();

    // 根据天数生成日期数组
    const days = [];
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    // 生成数据
    const data = new Array(totalDays).fill(0);
    dealListGroup('day', { time }).forEach((item) => {
      const day = +item.name.split('-')[2];
      data[day - 1] = -item.total;
    });
    return {
      type: 'category',
      tooltip: { trigger: 'axis' },
      xAxis: {
        name: '日期',
        boundaryGap: false,
        data: days,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: { show: false },
      series: [
        {
          name: '支出',
          data,
          type: 'line',
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      ],
      color: ['#4aaef8'],
      grid: {
        left: '2%',
        right: '2%',
        top: 0,
        bottom: '15%'
      }
    };
  };

  /**
   * 年度支出（月趋势）
   * @param time 时间，格式：yyyy
   * @returns
   */
  const monthOptions = (time: string) => {
    const data = new Array(12).fill(0);
    dealListGroup('month', { time }).forEach((item) => {
      const month = +item.name.split('-')[1];
      data[month - 1] = -item.total;
    });
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        name: '月份',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: { show: false },
      series: [
        {
          name: '支出',
          type: 'bar',
          barWidth: '60%',
          data
        }
      ],
      color: ['#4aaef8'],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: '15%'
      }
    };
  };

  /**
   * 总支出（年趋势）
   * @returns
   */
  const yearOptions = () => {
    const data: PieChart[] = [];
    dealListGroup('year').forEach((item) => {
      data.push({
        name: item.name,
        value: -item.total
      });
    });
    return {
      tooltip: { trigger: 'item' },
      title: [
        {
          x: convertPx(153),
          y: convertPx(40),
          textAlign: 'center',
          textStyle: {
            fontSize: convertPx(12),
            color: '#666'
          },
          subtextStyle: {
            fontSize: convertPx(16),
            color: '#333'
          },
          text: '记账天数',
          subtext: timeDiff
        }
      ],
      series: [
        {
          name: '全部支出',
          type: 'pie',
          radius: ['60%', '90%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          data
        }
      ]
    };
  };

  return {
    categoryOptions,
    dayOptions,
    monthOptions,
    yearOptions
  };
};
