const formatNumber = (number: number) => number.toString().padStart(2, '0');

export const getNow = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    year,
    month,
    day,
    hour,
    minute,
    yearStr: year.toString(),
    monthStr: formatNumber(month),
    dayStr: formatNumber(day),
    hourStr: formatNumber(hour),
    minuteStr: formatNumber(minute)
  };
};

export default getNow;
