import { isRepeating, isOneDay, isOverdueDate } from '../utils/common';
import { FilterType } from '../const.js';


const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchived);
};

const getNotArchivedTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchived);
};

const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavored);
};

const getOverdueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

const getTasksWithHashtags = (tasks) => {
  return tasks.filter((task) => task.tags.length);
};

const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.ALL:
      return getNotArchivedTasks(tasks);
    case FilterType.ARCHIVE:
      return getArchiveTasks(tasks);
    case FilterType.FAVORITES:
      return getFavoriteTasks(getNotArchivedTasks(tasks));
    case FilterType.OVERDUE:
      return getOverdueTasks(getNotArchivedTasks(tasks), nowDate);
    case FilterType.REPEATING:
      return getRepeatingTasks(getNotArchivedTasks(tasks));
    case FilterType.TAGS:
      return getTasksWithHashtags(getNotArchivedTasks(tasks));
    case FilterType.TODAY:
      return getTasksInOneDay(getNotArchivedTasks(tasks), nowDate);
  }

  return tasks;
};

const TaskFiltrationService = {
  getArchiveTasks,
  getNotArchivedTasks,
  getFavoriteTasks,
  getOverdueTasks,
  getRepeatingTasks,
  getTasksWithHashtags,
  getTasksInOneDay,
  getTasksByFilter
};

export { TaskFiltrationService };
