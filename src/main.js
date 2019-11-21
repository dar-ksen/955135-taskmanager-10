import {getBoardTemplate} from "./components/board";
import {getMenuTemplate} from "./components/menu";
import {getFilterTemplate} from "./components/filter";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";
import {getButtonLoadMoreTemplate} from "./components/load-more-button";

const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.js-main`);
const siteMainControlElement = siteMainElement.querySelector(`.js-main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainControlElement, getMenuTemplate());
render(siteMainElement, getFilterTemplate());
render(siteMainElement, getBoardTemplate());

const tastListElement = siteMainElement.querySelector(`.js-board__tasks`);
render(tastListElement, getTaskEditTemplate());

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => render(tastListElement, getTaskTemplate())
  );

const boardElement = siteMainElement.querySelector(`.js-board`);
render(boardElement, getButtonLoadMoreTemplate());
