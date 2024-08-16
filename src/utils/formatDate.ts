const formatDate = (dateOrTimestamp?: Date | number | string): string => {
  let date: Date;

  if (typeof dateOrTimestamp === 'number') {
    date = new Date(dateOrTimestamp);
  } else if (dateOrTimestamp instanceof Date) {
    date = dateOrTimestamp;
  } else if (typeof dateOrTimestamp === 'string') {
    date = new Date(dateOrTimestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  } else {
    return 'Invalid Date';
  }

  const now = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const isSameYear = now.getFullYear() === year;
  const isSameMonth = isSameYear && now.getMonth() === date.getMonth();
  const isSameDay = isSameMonth && now.getDate() === date.getDate();
  const isYesterday = isSameMonth && now.getDate() - 1 === date.getDate();

  // 获取当前日期是周几
  const nowDayOfWeek = now.getDay() === 0 ? 7 : now.getDay(); // 将周日（0）转为7
  // 获取目标日期是周几
  const dateDayOfWeek = date.getDay() === 0 ? 7 : date.getDay();

  // 判断是否在同一周
  const isSameWeek =
    isSameYear &&
    nowDayOfWeek >= dateDayOfWeek &&
    now.getTime() - date.getTime() < nowDayOfWeek * 24 * 60 * 60 * 1000;

  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  if (isYesterday) {
    return `昨天 ${hours}:${minutes}`;
  } else if (isSameDay) {
    return `${hours}:${minutes}`;
  } else if (isSameWeek) {
    return `${weekDays[dateDayOfWeek - 1]} ${hours}:${minutes}`;
  } else if (isSameMonth || isSameYear) {
    return `${month}.${day} ${hours}:${minutes}`;
  } else {
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
};

export default formatDate;
