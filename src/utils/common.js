import moment from 'moment';

const formatTime = (date) => moment(date).format(`hh:mm A`);
const formatDate = (date) => moment(date).format(`DD MMMM`);

const isFirst = (index) => index === 0;
const take = (array, count, startPos = 0) => array.slice(startPos, startPos + count);

const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

const replace = (collection, replacement, index) => [...collection.slice(0, index), replacement, ...collection.slice(index + 1)];

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export {
  formatTime,
  formatDate,
  isFirst,
  take,
  isRepeating,
  replace,
  isOneDay,
  isOverdueDate
};
