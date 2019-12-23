import moment from 'moment';

const formatTime = (date) => moment(date).format(`hh:mm A`);
const formatDate = (date) => moment(date).format(`DD MMMM`);

const isFirst = (index) => index === 0;
const take = (array, count, startPos = 0) => array.slice(startPos, startPos + count);

const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

export {
  formatTime,
  formatDate,
  isFirst,
  take,
  isRepeating,
};
