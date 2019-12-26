import SortComponent, { SortType } from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import NoTasksMessageComponent from "../components/no-tasks-message";

import TaskController, { Mode as TaskControllerMode, EMPTY_TASK } from './task';

import { renderComponent, removeComponent } from "../utils/render";
import { take, sortPurely } from '../utils/common';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const sortByDateInAscendingOrder = (a, b) => a.dueDate - b.dueDate;

const sortByDateInDescendingOrder = (a, b) => b.dueDate - a.dueDate;

const renderTasks = ($taskList, tasks, { onDataChange, onViewChange }) => {
  return tasks.map((task) => {
    const taskController = new TaskController($taskList, onDataChange, onViewChange);
    taskController.render(task, TaskControllerMode.DEFAULT);

    return taskController;
  });
};

export default class BoardController {
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;

    this._showedTaskControllers = [];
    this._showedTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._creatingTask = null;

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._taskModel.setFilterChangeHandler(this._onFilterChange);
    this._binders = {
      onDataChange: this._onDataChange,
      onViewChange: this._onViewChange
    };
  }

  render() {
    const tasks = this._taskModel.getTasks();

    const container = this._container.getElement();

    const inDoingTasks = tasks.filter((task) => !task.isArchived);

    if (inDoingTasks.length === 0) {
      renderComponent(container, this._noTasksMessageComponent);
      return;
    }

    renderComponent(container, this._sortComponent);

    renderComponent(container, this._taskListComponent);

    this._renderTasks(take(tasks, this._showedTasksCount));

    this._renderLoadMoreButton();
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const $taskList = this._taskListComponent.getElement();
    this._creatingTask = new TaskController($taskList, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EMPTY_TASK, TaskControllerMode.ADDING);
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _renderTasks(tasks) {
    const $taskList = this._taskListComponent.getElement();

    const additionalTaskControllers = renderTasks($taskList, tasks, this._binders);
    this._showedTaskControllers = [...this._showedTaskControllers, ...additionalTaskControllers];
    this._showedTasksCount = this._showedTaskControllers.length;
  }

  _renderLoadMoreButton() {
    removeComponent(this._loadMoreButtonComponent);

    if (this._showedTasksCount >= this._taskModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    renderComponent(container, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(take(this._taskModel.getTasks(), count));
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, replaceableTask, replacementTask) {
    if (replaceableTask === EMPTY_TASK) {
      this._creatingTask = null;
      if (replacementTask === null) {
        taskController.destroy();
        this._updateTasks(this._showedTasksCount);
      } else {
        this._taskModel.addTask(replacementTask);
        taskController.render(replacementTask, TaskControllerMode.DEFAULT);

        const destroyedTask = this._showedTaskControllers.pop();
        destroyedTask.destroy();

        this._showedTaskControllers = [taskController, ...this._showedTaskControllers];
        this._showedTasksCount = this._showedTaskControllers.length;
      }
    } else if (replacementTask === null) {
      this._taskModel.removeTask(replaceableTask.id);
      this._updateTasks(this._showedTasksCount);
    } else {
      const isSuccess = this._taskModel.updateTask(replaceableTask.id, replacementTask);

      if (isSuccess) {
        taskController.render(replacementTask, TaskControllerMode.DEFAULT);
        this._updateTasks(this._showedTasksCount);
      }
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const tasks = this._taskModel.getTasks();
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
        sortedTasks = take(tasks, this._showedTasksCount);
        break;
      }
    }

    this._removeTasks();
    this._renderTasks(sortedTasks);

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      removeComponent(this._loadMoreButtonComponent);
    }
  }

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showedTasksCount;
    const tasks = this._taskModel.getTasks();

    this._showedTasksCount = this._showedTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    this._renderTasks(tasks.slice(prevTasksCount, this._showedTasksCount));

    if (this._showedTasksCount >= tasks.length) {
      removeComponent(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}
