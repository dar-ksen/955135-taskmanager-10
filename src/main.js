import MenuComponent from './components/menu';
import FilterComponent from './components/filter';

import BoardComponent from './components/board';
import SortComponent from './components/sort';
import TaskListComponent from './components/task-list';
import TaskComponent from './components/task';
import InEditTaskComponent from './components/task-edit';
import LoadMoreButtonComponent from './components/load-more-button';

import NoTasksComponent from './components/no-tasks';

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

const workTasks = tasks.filter((task) => !task.isArchive);

if (workTasks.length === 0) {
  const noTasksComponent = new NoTasksComponent();
  renderComponent(boardComponent.getElement(), noTasksComponent, RenderPosition.BEFORE_END);
} else {
  const sortComponent = new SortComponent();
  renderComponent(boardComponent.getElement(), sortComponent, RenderPosition.BEFORE_END);

  const taskListComponent = new TaskListComponent();
  renderComponent(boardComponent.getElement(), taskListComponent, RenderPosition.BEFORE_END);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  take(workTasks, showingTasksCount).forEach((task) => renderTask(taskListComponent.getElement(), task));

  if (showingTasksCount < workTasks.length) {
    const loadMoreButtonComponent = new LoadMoreButtonComponent();

    renderComponent(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFORE_END);

    loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
      take(workTasks, SHOWING_TASKS_COUNT_BY_BUTTON, showingTasksCount).forEach((task) => renderTask(taskListComponent.getElement(), task));
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      if (showingTasksCount > workTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });

  }

}


