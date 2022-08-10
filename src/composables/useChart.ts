import { useDealStore } from '../store/useDealStore';
import { PieChart } from '../types/chart';
const { timeDiff, dealListGroup } = useDealStore();

export const useChart = () => {
  // 饼图通用设置
  const pieCommonSettings = {
    tooltip: {
      trigger: 'item',
      // backgroundColor: 'rgba(50,50,50,0.7)',
      // textStyle: {
      //   color: '#fff'
      // }
    },
    title: {
      x: '48.5%',
      y: '35%',
      textAlign: 'center',
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
      subtextStyle: {
        fontSize: 16,
        color: '#333'
      }
    },
    series: {
      type: 'pie',
      radius: ['60%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      }
    }
  };

  // 折线图与条形图通用设置
  const lineAndBarCommonSettings = {
    tooltip: {
      trigger: 'axis',
      // backgroundColor: 'rgba(50,50,50,0.7)',
      // textStyle: {
      //   color: '#fff'
      // }
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999'
        }
      }
    },
    color: ['#4aaef8'],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: '15%'
    }
  };

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
      tooltip: { ...pieCommonSettings.tooltip },
      title: [
        {
          text: '交易笔数',
          subtext: amount,
          ...pieCommonSettings.title
        }
      ],
      series: [
        {
          name: '分类统计',
          data,
          ...pieCommonSettings.series
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
      tooltip: { ...lineAndBarCommonSettings.tooltip },
      xAxis: {
        name: '日期',
        data: days,
        ...lineAndBarCommonSettings.xAxis
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
      color: lineAndBarCommonSettings.color,
      grid: lineAndBarCommonSettings.grid
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
        axisPointer: {
          type: 'shadow'
        },
        ...lineAndBarCommonSettings.tooltip
      },
      xAxis: {
        name: '月份',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        ...lineAndBarCommonSettings.xAxis
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
      color: lineAndBarCommonSettings.color,
      grid: lineAndBarCommonSettings.grid
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
      tooltip: { ...pieCommonSettings.tooltip },
      title: [
        {
          text: '记账天数',
          subtext: timeDiff,
          ...pieCommonSettings.title
        }
      ],
      series: [
        {
          name: '全部支出',
          data,
          ...pieCommonSettings.series
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
