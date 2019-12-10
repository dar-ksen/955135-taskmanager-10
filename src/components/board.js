import { createElement } from '../utils';

const getBoardTemplate = () => {
  return (`
    <section class="board container js-board"></section>
  `);
};


export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getBoardTemplate();
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
