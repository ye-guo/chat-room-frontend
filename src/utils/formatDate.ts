const formatDate = (dateOrTimestamp?: Date | number) => {
  let date: Date;

  if (typeof dateOrTimestamp === 'number') {
    date = new Date(dateOrTimestamp);
  } else if (dateOrTimestamp instanceof Date) {
    date = dateOrTimestamp;
  } else {
    return 'Invalid Date'; // 或者返回其他适当的默认值
  }

  const now = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const isSameYear = now.getFullYear() === year;
  const isSameMonth = now.getFullYear() === year && now.getMonth() === date.getMonth();
  const isSameDay = now.getFullYear() === year && now.getMonth() === date.getMonth() && now.getDate() === date.getDate();
  const isYesterday = now.getFullYear() === year && now.getMonth() === date.getMonth() && now.getDate() - 1 === date.getDate();

  if (isYesterday) {
    return `昨天 ${hours}:${minutes}`;
  } else if (isSameDay) {
    return `${hours}:${minutes}`;
  } else if (isSameMonth) {
    return `${month}-${day} ${hours}:${minutes}`;
  } else if (isSameYear) {
    return `${month}-${day} ${hours}:${minutes}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
};

export default formatDate;
