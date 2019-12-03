import BoardComponent from './components/board';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import TaskEditComponent from './components/task-edit';
import TaskComponent from './components/task';
import LoadMoreButtonComponent from './components/load-more-button';

import { tasks } from './mock/task.js';
import { generateFilters } from './mock/filter';

import { render, RenderPosition, isFirst, take } from './utils';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.js-main`);
const siteMainControlElement = siteMainElement.querySelector(`.js-main__control`);

render(siteMainControlElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const taskListElement = boardComponent.getElement().querySelector(`.js-board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

take(tasks, showingTasksCount).forEach((task, index) => isFirst(index)
  ? render(taskListElement, new TaskEditComponent(task).getElement(), RenderPosition.BEFOREEND)
  : render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND)
);

if (showingTasksCount < tasks.length) {
  const loadMoreButtonComponent = new LoadMoreButtonComponent();

  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    take(tasks, SHOWING_TASKS_COUNT_BY_BUTTON, showingTasksCount)
    .map((task) => render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    if (showingTasksCount > tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });

}
