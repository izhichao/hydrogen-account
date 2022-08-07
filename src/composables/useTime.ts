export const useTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const now = () => {
    return { year, month, day, hour, minute };
  };

  const nowStr = () => {
    const yearStr = year.toString();
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    return {
      yearStr,
      monthStr,
      dayStr,
      hourStr,
      minuteStr
    };
  };

  return {
    now,
    nowStr
  };
};
