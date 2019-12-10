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

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const areElementsAvailable = Boolean(parentElement && newElement && oldElement);

  if (areElementsAvailable && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  RenderPosition,
  createElement,
  renderComponent,
  replace
};
