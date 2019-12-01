const formatterOptionsTime = {
  hour12: true,
  hour: `2-digit`,
  minute: `2-digit`,
};

const TimeFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptionsTime);

const formatTime = (date) => TimeFormatter.format(date);

const formatterOptionsDate = {
  day: `numeric`,
  month: `long`,
};

const DateFormatter = new Intl.DateTimeFormat(`en-GB`, formatterOptionsDate);

const formatDate = (date) => DateFormatter.format(date);

const isFirst = (index) => index === 0;
const take = (array, count, startPos = 0) => array.slice(startPos, startPos + count);


export { formatTime, formatDate, isFirst, take };
