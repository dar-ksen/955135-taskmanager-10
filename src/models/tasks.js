import { getTasksByFilter } from '../utils/filter.js';
import { FilterType } from '../const.js';
import { replace } from '../utils/common';

export default class Tasks {
  constructor() {
    this._tasks = [];

    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTasks() {
    return getTasksByFilter(this._tasks, this._activeFilterType);
  }

  getTasksAll() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  updateTask(id, updatedTask) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = replace(this._tasks, updatedTask, index);

    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

}
