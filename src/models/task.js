class TaskModel {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.dueDate = data[`due_date`] ? new Date(data[`due_date`]) : null;
    this.tags = data.tags;
    this.repeatingDays = data.repeatingDays;
    this.color = data.color;
    this.isFavored = data.isFavored;
    this.isArchived = data.isArchived;
  }

  toRAW() {
    return {
      'id': this.id,
      'description': this.description,
      'due_date': this.dueDate ? this.dueDate.toISOString() : null,
      'tags': Array.from(this.tags),
      'repeating_days': this.repeatingDays,
      'color': this.color,
      'is_favorite': this.isFavored,
      'is_archived': this.isArchived,
    };
  }

  static parseTask(data) {
    return new TaskModel({
      id: data[`id`],
      description: data[`description`] || ``,
      dueDate: data[`due_date`] ? new Date(data[`due_date`]) : null,
      tags: new Set(data[`tags`] || []),
      repeatingDays: data[`repeating_days`],
      color: data[`color`],
      isFavored: Boolean(data[`is_favorite`]),
      isArchived: Boolean(data[`is_archived`]),
    });
  }

  static parseTasks(data) {
    return data.map(TaskModel.parseTask);
  }

  static clone(data) {
    return new TaskModel(data);
  }
}

export { TaskModel as default };
