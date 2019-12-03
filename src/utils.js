const formatterOptionsTime = {
  hour12: true,
  hour: `2-digit`,
  minute: `2-digit`,
};

const TimeFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptionsTime);

export const formatTime = (date) => TimeFormatter.format(date);

const formatterOptionsDate = {
  day: `numeric`,
  month: `long`,
};

const DateFormatter = new Intl.DateTimeFormat(`en-GB`, formatterOptionsDate);

export const formatDate = (date) => DateFormatter.format(date);

export const isFirst = (index) => index === 0;
export const take = (array, count, startPos = 0) => array.slice(startPos, startPos + count);

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
