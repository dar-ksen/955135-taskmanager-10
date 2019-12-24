import TaskComponent from "../components/task";
import InEditTaskComponent from "../components/task-edit";

import { renderComponent, replaceComponent, removeComponent, RenderPosition } from "../utils/render";
import { COLOR } from '../const.js';

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: [],
  color: COLOR.BLACK,
  isFavored: false,
  isArchived: false,
};

class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._InEditTaskComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldInEditTaskComponent = this._InEditTaskComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._InEditTaskComponent = new InEditTaskComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._startTaskEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, { ...task, isFavored: !task.isFavored });
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, { ...task, isArchived: !task.isArchived });
    });

    this._InEditTaskComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._InEditTaskComponent.getData();
      this._onDataChange(this, task, data);
      this._stopTaskEditing();
    });
    this._InEditTaskComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

    switch (mode) {
      case Mode.DEFAULT: {
        if (oldInEditTaskComponent && oldTaskComponent) {
          replaceComponent(this._taskComponent, oldTaskComponent);
          replaceComponent(this._InEditTaskComponent, oldInEditTaskComponent);
          this._stopTaskEditing();
        } else {
          renderComponent(this._container, this._taskComponent);
        }
        break;
      }
      case Mode.ADDING: {
        if (oldInEditTaskComponent && oldTaskComponent) {
          removeComponent(oldTaskComponent);
          removeComponent(oldInEditTaskComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderComponent(this._container, this._InEditTaskComponent, RenderPosition.AFTER_BEGIN);
      }
    }

    if (oldInEditTaskComponent && oldTaskComponent) {
      replaceComponent(this._taskComponent, oldTaskComponent);
      replaceComponent(this._InEditTaskComponent, oldInEditTaskComponent);
    } else {
      renderComponent(this._container, this._taskComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._stopTaskEditing();
    }
  }

  destroy() {
    removeComponent(this.__InEditTaskComponent);
    removeComponent(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _startTaskEditing() {
    this._onViewChange();

    replaceComponent(this._InEditTaskComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _stopTaskEditing() {
    replaceComponent(this._taskComponent, this._InEditTaskComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }
      this._stopTaskEditing();
    }
  }
}

export {
  Mode,
  EmptyTask,
  TaskController as default,
};
