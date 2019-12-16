import TaskComponent from "../components/task";
import InEditTaskComponent from "../components/task-edit";

import { renderComponent, replace } from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._InEditTaskComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldInEditTaskComponent = this._InEditTaskComponent;

    this._taskComponent = new TaskComponent(task);
    this._InEditTaskComponent = new InEditTaskComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._startTaskEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._InEditTaskComponent.setSubmitHandler(() => this._stopTaskEditing());

    if (oldInEditTaskComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._InEditTaskComponent, oldInEditTaskComponent);
    } else {
      renderComponent(this._container, this._taskComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._stopTaskEditing();
    }
  }

  _startTaskEditing() {
    this._onViewChange();

    replace(this._InEditTaskComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _stopTaskEditing() {
    replace(this._taskComponent, this._InEditTaskComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._stopTaskEditing();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
