import TaskComponent from "../components/task";
import InEditTaskComponent from "../components/task-edit";
import TaskModel from '../models/task';
import flatpickr from 'flatpickr';
import { renderComponent, replaceComponent, removeComponent, RenderPosition } from "../utils/render";
import { COLOR, DAYS } from '../const.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

const Mode = {
  CREATING: `creating`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EMPTY_TASK = {
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

const parseFormData = (formData) => {
  const repeatingDays = DAYS.reduce((acc, dayName) => {
    acc[dayName] = false;
    return acc;
  }, {});
  const date = formData.get(`date`);

  return new TaskModel({
    description: formData.get(`text`),
    dueDate: date ? flatpickr.parseDate(date, `d F y H:i`) : null,
    tags: formData.getAll(`hashtag`),
    repeatingDays: formData.getAll(`repeat`).reduce((acc, dayName) => {
      acc[dayName] = true;
      return acc;
    }, repeatingDays),
    color: formData.get(`color`),
    isFavored: false,
    isArchived: false
  });
};

class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._inEditTaskComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldInEditTaskComponent = this._inEditTaskComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._inEditTaskComponent = new InEditTaskComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._startTaskEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isFavored = !newTask.isFavored;

      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isArchived = !newTask.isArchived;

      this._onDataChange(this, task, newTask);
    });

    this._inEditTaskComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._inEditTaskComponent.setData({
        saveButtonText: `Saving...`,
      });

      const formData = this._inEditTaskComponent.getData();
      const data = parseFormData(formData);

      this._onDataChange(this, task, data);
    });

    this._inEditTaskComponent.setDeleteButtonClickHandler(() => {
      this._inEditTaskComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, task, null);
    });

    switch (mode) {
      case Mode.DEFAULT: {
        if (oldInEditTaskComponent && oldTaskComponent) {
          replaceComponent(this._taskComponent, oldTaskComponent);
          replaceComponent(this._inEditTaskComponent, oldInEditTaskComponent);
          this._stopTaskEditing();
        } else {
          renderComponent(this._container, this._taskComponent);
        }
        break;
      }
      case Mode.CREATING: {
        if (oldInEditTaskComponent && oldTaskComponent) {
          removeComponent(oldTaskComponent);
          removeComponent(oldInEditTaskComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderComponent(this._container, this._inEditTaskComponent, RenderPosition.AFTER_BEGIN);
      }
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._stopTaskEditing();
    }
  }

  destroy() {
    removeComponent(this._inEditTaskComponent);
    removeComponent(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._inEditTaskComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._inEditTaskComponent.getElement().querySelector(`.card__inner`).style.outline = `3px solid red`;
    this._taskComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._taskComponent.getElement().querySelector(`.card__inner`).style.outline = `3px solid red`;

    setTimeout(() => {
      this._inEditTaskComponent.getElement().style.animation = ``;
      this._inEditTaskComponent.getElement().querySelector(`.card__inner`).style.outline = ``;
      this._taskComponent.getElement().style.animation = ``;
      this._taskComponent.getElement().querySelector(`.card__inner`).style.outline = ``;

      this._inEditTaskComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _startTaskEditing() {
    this._onViewChange();

    replaceComponent(this._inEditTaskComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _stopTaskEditing() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._inEditTaskComponent.reset();

    if (document.contains(this._inEditTaskComponent.getElement())) {
      replaceComponent(this._taskComponent, this._inEditTaskComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.CREATING) {
        this._onDataChange(this, EMPTY_TASK, null);
      }
      this._stopTaskEditing();
    }
  }
}

export {
  Mode,
  EMPTY_TASK,
  TaskController as default,
};
