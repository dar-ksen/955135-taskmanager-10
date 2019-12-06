import BoardComponent from './components/board';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import InEditTaskComponent from './components/task-edit';
import TaskComponent from './components/task';
import LoadMoreButtonComponent from './components/load-more-button';

import { tasks } from './mock/task.js';
import { generateFilters } from './mock/filter';

import { renderComponent, RenderPosition, take } from './utils';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      startTaskEditing();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const startTaskEditing = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const stopTaskEditing = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.js-card__btn--edit`);

  editButton.addEventListener(`click`, () => {
    stopTaskEditing();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new InEditTaskComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`.js-card__form`);

  editForm.addEventListener(`submit`, startTaskEditing);

  renderComponent(taskListElement, taskComponent, RenderPosition.BEFORE_END);
};

const siteMainElement = document.querySelector(`.js-main`);
const siteMainControlElement = siteMainElement.querySelector(`.js-main__control`);

renderComponent(siteMainControlElement, new MenuComponent(), RenderPosition.BEFORE_END);

const filters = generateFilters(tasks);
renderComponent(siteMainElement, new FilterComponent(filters), RenderPosition.BEFORE_END);

const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent, RenderPosition.BEFORE_END);

const taskListElement = boardComponent.getElement().querySelector(`.js-board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

take(tasks, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

if (showingTasksCount < tasks.length) {
  const loadMoreButtonComponent = new LoadMoreButtonComponent();

  renderComponent(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFORE_END);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    take(tasks, SHOWING_TASKS_COUNT_BY_BUTTON, showingTasksCount).forEach((task) => renderTask(taskListElement, task));
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    if (showingTasksCount > tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });

}
