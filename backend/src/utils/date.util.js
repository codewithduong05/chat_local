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
// export const addHours = (date, hours) => {
//   return new Date(date.getTime() + hours * 60 * 60 * 1000);
// };

// export const getRemainingMs = (expireAt) => {
//   return expireAt.getTime() - Date.now();
// };
// const parseServerTime = (str) => {
//   const [date, time] = str.split('/');
//   const [d, m, y] = date.split('-');
//   const [hh, mm] = time.split(':');

//   return new Date(y, m - 1, d, hh, mm).getTime();
// };

// export {
//   parseServerTime
// }
// utils/date.util.js

export const parseServerTime = (timeStr) => {
  // format: "28-01-2026/19:14"
  const [datePart, timePart] = timeStr.split('/');
  const [dd, mm, yyyy] = datePart.split('-').map(Number);
  const [HH, MM] = timePart.split(':').map(Number);
  return new Date(yyyy, mm - 1, dd, HH, MM, 0, 0);
};

export const addHours = (date, hours) => {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
};

export const getRemainingMs = (expireAt) => {
  return expireAt.getTime() - Date.now();
};
