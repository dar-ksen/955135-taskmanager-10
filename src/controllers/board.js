import SortComponent, { SortType } from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import NoTasksMessageComponent from "../components/no-tasks-message";

import TaskController from './task';

import { renderComponent } from "../utils/render";
import { take } from '../utils/common';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    const taskController = new TaskController(taskListElement);
    taskController.render(task);
  });
};

const sortByDateInAscendingOrder = (a, b) => a.dueDate - b.dueDate;

const sortByDateInDescendingOrder = (a, b) => b.dueDate - a.dueDate;

const sortPurely = (collection, iterate) => collection.slice().sort(iterate);

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = (arrayTask) => {
      if (showingTasksCount >= arrayTask.length) {
        return;
      }

      renderComponent(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        renderTasks(taskListElement, take(arrayTask, SHOWING_TASKS_COUNT_BY_BUTTON, showingTasksCount));

        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

        if (showingTasksCount > arrayTask.length) {
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
    renderLoadMoreButton(inDoingTasks);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE_UP: {
          sortedTasks = sortPurely(inDoingTasks, sortByDateInAscendingOrder);
          break;
        }
        case SortType.DATE_DOWN: {
          sortedTasks = sortPurely(inDoingTasks, sortByDateInDescendingOrder);
          break;
        }
        case SortType.DEFAULT:
        default: {
          sortedTasks = inDoingTasks;
          break;
        }
      }

      showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

      taskListElement.innerHTML = ``;
      renderTasks(taskListElement, take(sortedTasks, showingTasksCount));

      renderLoadMoreButton(sortedTasks);
    });
  }
}
