const today = new Date();

const generateFilters = (tasks) => {
  const inDoingTasks = tasks.filter((task) => !task.isArchived);
  return [
    {
      name: `all`,
      count: inDoingTasks.length,
    },
    {
      name: `overdue`,
      count: inDoingTasks.filter(({ dueDate }) => dueDate instanceof Date && dueDate < Date.now()).length,
    },
    {
      name: `today`,
      count: inDoingTasks.filter(({ dueDate }) => dueDate instanceof Date && dueDate.getDay() === today.getDay()).length,
    },
    {
      name: `favorites`,
      count: inDoingTasks.filter(({ isFavored }) => isFavored).length,
    },
    {
      name: `repeating`,
      count: inDoingTasks.filter(({ repeatingDays }) => Object.values(repeatingDays).some(Boolean)).length,
    },
    {
      name: `tags`,
      count: inDoingTasks.filter(({ tags }) => tags.length > 0).length,
    },
    {
      name: `archive`,
      count: tasks.filter(({ isArchived }) => isArchived).length,
    },
  ];
};

export { generateFilters };
