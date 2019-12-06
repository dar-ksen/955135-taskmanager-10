const today = new Date();

const generateFilters = (tasks) => {
  return [
    {
      name: `all`,
      count: tasks.filter((task) => !task.isArchive).length,
    },
    {
      name: `overdue`,
      count: tasks.filter(({ dueDate }) => dueDate instanceof Date && dueDate < Date.now()).length,
    },
    {
      name: `today`,
      count: tasks.filter(({ dueDate }) => dueDate instanceof Date && dueDate.getDay() === today.getDay()).length,
    },
    {
      name: `favorites`,
      count: tasks.filter(({ isFavorite }) => isFavorite).length,
    },
    {
      name: `repeating`,
      count: tasks.filter(({ repeatingDays }) => Object.values(repeatingDays).some(Boolean)).length,
    },
    {
      name: `tags`,
      count: tasks.filter(({ tags }) => tags.length > 0).length,
    },
    {
      name: `archive`,
      count: tasks.filter(({ isArchive }) => isArchive).length,
    },
  ];
};

export { generateFilters };
