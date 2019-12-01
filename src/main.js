import { getBoardTemplate } from './components/board';
import { getMenuTemplate } from './components/menu';
import { getFilterTemplate } from './components/filter';
import { getTaskEditTemplate } from './components/task-edit';
import { getTaskTemplate } from './components/task';
import { getButtonLoadMoreTemplate } from './components/load-more-button';

import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter';

const TASK_COUNT = 18;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASK_COUNT);

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

render(taskListElement, getTaskEditTemplate(tasks[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, getTaskTemplate(task), `beforeend`));

const boardElement = siteMainElement.querySelector(`.js-board`);

if (showingTasksCount <= tasks.length) {
  render(boardElement, getButtonLoadMoreTemplate());

  const loadMoreButton = boardElement.querySelector(`.js-load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => render(taskListElement, getTaskTemplate(task)));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
