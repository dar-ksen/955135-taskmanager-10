const formatterOptions = {
  hour12: true,
  hour: `2-digit`,
  minute: `2-digit`,
};

const TimeFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptions);

const formatTime = (date) => TimeFormatter.format(date);

export { formatTime };
