import SortComponent, { SortType } from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import NoTasksMessageComponent from "../components/no-tasks-message";

import TaskController from './task';

import { renderComponent, remove } from "../utils/render";
import { take } from '../utils/common';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const sortByDateInAscendingOrder = (a, b) => a.dueDate - b.dueDate;

const sortByDateInDescendingOrder = (a, b) => b.dueDate - a.dueDate;

const sortPurely = (collection, iterate) => collection.slice().sort(iterate);

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task);

    return taskController;
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._showedTaskControllers = [];
    this._showedTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();

    const inDoingTasks = this._tasks.filter((task) => !task.isArchive);

    if (inDoingTasks.length === 0) {
      renderComponent(container, this._noTasksMessageComponent);
      return;
    }

    renderComponent(container, this._sortComponent);

    renderComponent(container, this._taskListComponent);

    const taskListElement = this._taskListComponent.getElement();

    const newTasks = renderTasks(taskListElement, take(this._tasks, this._showedTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton(this._tasks);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _renderLoadMoreButton(arrayTasks) {
    if (this._showedTasksCount >= arrayTasks.length) {
      return;
    }

    const container = this._container.getElement();

    renderComponent(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const taskListElement = this._taskListComponent.getElement();

      const newTasks = renderTasks(taskListElement, take(arrayTasks, SHOWING_TASKS_COUNT_BY_BUTTON, this._showedTasksCount), this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
      this._showedTasksCount = this._showedTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      if (this._showedTasksCount >= arrayTasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP: {
        sortedTasks = sortPurely(this._tasks, sortByDateInAscendingOrder);
        break;
      }
      case SortType.DATE_DOWN: {
        sortedTasks = sortPurely(this._tasks, sortByDateInDescendingOrder);
        break;
      }
      case SortType.DEFAULT:
      default: {
        sortedTasks = this._tasks;
        break;
      }
    }

    const taskListElement = this._taskListComponent.getElement();
    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, take(sortedTasks, SHOWING_TASKS_COUNT_BY_BUTTON, this.showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton(sortedTasks);
  }
}
