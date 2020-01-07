import { TaskFiltrationService } from '../services/task-filtration';
import { FilterType } from '../const';
import { replace } from '../utils/common';

class TaskModel {
  constructor() {
    this._tasks = [];

    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTasks() {
    return TaskFiltrationService.getTasksByFilter(this._tasks, this._activeFilterType);
  }

  getTasksAll() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  removeTask(id) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [...this._tasks.slice(0, index), ...this._tasks.slice(index + 1)];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateTask(id, updatedTask) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = replace(this._tasks, updatedTask, index);

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addTask(task) {
    this._tasks = [task, ...this._tasks];
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export { TaskModel as default };
