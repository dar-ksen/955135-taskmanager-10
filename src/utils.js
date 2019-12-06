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

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const renderComponent = (container, component, place) => {
  const element = component.getElement();
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};

export {
  formatTime,
  formatDate,
  isFirst,
  take,
  RenderPosition,
  createElement,
  renderComponent
};
