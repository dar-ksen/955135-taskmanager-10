import { createElement } from '../utils';

const getNoTasksMessageTemplate = () => {
  return (`
    <p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>
  `);
};

export default class NoTasksMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getNoTasksMessageTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
