import { createElement } from '../utils';

const getTaskListTemplate = () => {
  return (`
    <div class="board__tasks js-board__tasks"></div>
  `);
};

export default class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTaskListTemplate();
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
