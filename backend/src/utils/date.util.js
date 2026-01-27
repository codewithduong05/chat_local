export const getToday = () => {
  const now = new Date();
  const monthNumber = now.getMonth() + 1;
  const month = monthNumber.toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year}/${hour}:${minute}`;
};

const parseServerTime = (str) => {
  const [date, time] = str.split('/');
  const [d, m, y] = date.split('-');
  const [hh, mm] = time.split(':');

  return new Date(y, m - 1, d, hh, mm).getTime();
};

export {
  parseServerTime
}