import SortComponent, { SortType } from "../components/sort";
import TaskListComponent from "../components/task-list";
import TaskComponent from "../components/task";
import InEditTaskComponent from "../components/task-edit";
import LoadMoreButtonComponent from "../components/load-more-button";

import NoTasksMessageComponent from "../components/no-tasks-message";

import { renderComponent, replace } from "../utils/render";
import { take } from '../utils/common';

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

  const startTaskEditing = () => replace(taskComponent, taskEditComponent);

  const stopTaskEditing = () => replace(taskEditComponent, taskComponent);

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    stopTaskEditing();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new InEditTaskComponent(task);
  taskEditComponent.setSubmitHandler(startTaskEditing);

  renderComponent(taskListElement, taskComponent);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => renderTask(taskListElement, task));
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {

    const renderLoadMoreButton = () => {
      if (showingTasksCount >= inDoingTasks.length) {
        return;
      }

      renderComponent(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        renderTasks(taskListElement, take(inDoingTasks, SHOWING_TASKS_COUNT_BY_BUTTON, showingTasksCount));

        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

        if (showingTasksCount > inDoingTasks.length) {
          this._loadMoreButtonComponent.removeElement();
        }
      });

    };

    const container = this._container.getElement();

    const inDoingTasks = tasks.filter((task) => !task.isArchive);

    if (inDoingTasks.length === 0) {
      renderComponent(container, this._noTasksMessageComponent);
      return;
    }

    const taskListElement = this._taskListComponent.getElement();

    renderComponent(container, this._sortComponent);

    renderComponent(container, this._taskListComponent);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, take(inDoingTasks, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE_UP:
          sortedTasks = inDoingTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case SortType.DATE_DOWN:
          sortedTasks = inDoingTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case SortType.DEFAULT:
          showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
          sortedTasks = take(inDoingTasks, showingTasksCount);
          break;
        default :
          showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
          sortedTasks = take(inDoingTasks, showingTasksCount);
      }

      taskListElement.innerHTML = ``;
      renderTasks(taskListElement, sortedTasks);

      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        this._loadMoreButtonComponent.removeElement();
      }

    });
  }
}
