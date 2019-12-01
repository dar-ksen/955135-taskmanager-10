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

export { formatTime, formatDate };
