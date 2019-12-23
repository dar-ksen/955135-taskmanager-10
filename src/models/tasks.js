import { replace } from '../utils/common';

export default class Tasks {
  constructor() {
    this._tasks = [];
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  updateTask(id, updatedTask) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    replace(this._tasks, updatedTask, index);

    return true;
  }
}
