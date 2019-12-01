import { getBoardTemplate } from './components/board';
import { getMenuTemplate } from './components/menu';
import { getFilterTemplate } from './components/filter';
import { getTaskEditTemplate } from './components/task-edit';
import { getTaskTemplate } from './components/task';
import { getButtonLoadMoreTemplate } from './components/load-more-button';

import { Tasks as tasks } from './mock/task.js';
import { generateFilters } from './mock/filter';

import { isFirst, take } from './utils';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.js-main`);
const siteMainControlElement = siteMainElement.querySelector(`.js-main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainControlElement, getMenuTemplate());

const filters = generateFilters(tasks);
render(siteMainElement, getFilterTemplate(filters));
render(siteMainElement, getBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.js-board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
let taskListTemlate = take(tasks, showingTasksCount)
  .map((task, index) => isFirst(index)
    ? getTaskEditTemplate(task)
    : getTaskTemplate(task)
  ).join(`\n`);

render(taskListElement, taskListTemlate);

const boardElement = siteMainElement.querySelector(`.js-board`);

if (showingTasksCount < tasks.length) {
  render(boardElement, getButtonLoadMoreTemplate());

  const loadMoreButton = boardElement.querySelector(`.js-load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    taskListTemlate = take(tasks, SHOWING_TASKS_COUNT_BY_BUTTON, showingTasksCount)
    .map((task) => render(taskListElement, getTaskTemplate(task))).join(`\n`);

    render(taskListElement, taskListTemlate);

    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
