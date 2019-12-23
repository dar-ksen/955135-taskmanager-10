import SortComponent, { SortType } from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import NoTasksMessageComponent from "../components/no-tasks-message";

import TaskController from './task';

import { renderComponent, removeComponent } from "../utils/render";
import { take } from '../utils/common';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const sortByDateInAscendingOrder = (a, b) => a.dueDate - b.dueDate;

const sortByDateInDescendingOrder = (a, b) => b.dueDate - a.dueDate;

const sortPurely = (collection, iterate) => collection.slice().sort(iterate);


const renderTasks = ($taskList, tasks, { onDataChange, onViewChange }) => {
  return tasks.map((task) => {
    const taskController = new TaskController($taskList, onDataChange, onViewChange);
    taskController.render(task);

    return taskController;
  });
};

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._showedTaskControllers = [];
    this._showedTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
    this._binders = {
      onDataChange: this._onDataChange,
      onViewChange: this._onViewChange
    };
  }

  render() {
    const tasks = this._tasksModel.getTasks();

    const container = this._container.getElement();

    const inDoingTasks = tasks.filter((task) => !task.isArchived);

    if (inDoingTasks.length === 0) {
      renderComponent(container, this._noTasksMessageComponent);
      return;
    }

    renderComponent(container, this._sortComponent);

    renderComponent(container, this._taskListComponent);

    const $taskList = this._taskListComponent.getElement();

    const additionalTaskControllers = renderTasks($taskList, take(tasks, this._showedTasksCount), this._binders);
    this._showedTaskControllers = [...this._showedTaskControllers, ...additionalTaskControllers];
    this._renderLoadMoreButton(tasks);
  }

  _onDataChange(taskController, replaceableTask, replacementTask) {
    const isSuccess = this._tasksModel.updateTask(replaceableTask.id, replacementTask);

    if (isSuccess) {
      taskController.render(replacementTask);
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((controller) => controller.setDefaultView());
  }

  _renderLoadMoreButton(tasks) {
    if (this._showedTasksCount >= tasks.length) {
      return;
    }

    const container = this._container.getElement();

    renderComponent(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const $taskList = this._taskListComponent.getElement();

      const additionalTaskControllers = renderTasks($taskList, take(tasks, SHOWING_TASKS_COUNT_BY_BUTTON, this._showedTasksCount), this._binders);
      this._showedTaskControllers = [...this._showedTaskControllers, ...additionalTaskControllers];
      this._showedTasksCount = this._showedTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      if (this._showedTasksCount >= tasks.length) {
        removeComponent(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const tasks = this._tasksModel.getTasks();
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP: {
        sortedTasks = sortPurely(tasks, sortByDateInAscendingOrder);
        break;
      }
      case SortType.DATE_DOWN: {
        sortedTasks = sortPurely(tasks, sortByDateInDescendingOrder);
        break;
      }
      case SortType.DEFAULT:
      default: {
        sortedTasks = tasks;
        break;
      }
    }

    const $taskList = this._taskListComponent.getElement();
    $taskList.innerHTML = ``;

    const additionalTaskControllers = renderTasks($taskList, take(sortedTasks, SHOWING_TASKS_COUNT_BY_BUTTON, this.showingTasksCount), this._binders);
    this._showedTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._showedTaskControllers = additionalTaskControllers;

    this._renderLoadMoreButton(sortedTasks);
  }

  _onFilterChange() {
    const $taskList = this._taskListComponent.getElement();
    $taskList.innerHTML = ``;
    const tasks = this._tasksModel.getTasks();
    this._showedTasksCount = SHOWING_TASKS_COUNT_ON_START;
    const additionalTaskControllers = renderTasks($taskList, take(tasks, SHOWING_TASKS_COUNT_BY_BUTTON, this.showingTasksCount), this._binders);
    this._showedTaskControllers = additionalTaskControllers;

    if ((SHOWING_TASKS_COUNT_ON_START >= tasks.length) && Boolean(this._loadMoreButtonComponent.getElement())) {
      removeComponent(this._loadMoreButtonComponent);
      return;
    }

    this._renderLoadMoreButton(tasks);
  }
}
