import { createElement } from '../utils';

const getButtonLoadMoreTemplate = () => {
  return (`
    <button class="load-more js-load-more" type="button">load more</button>
  `);
};

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getButtonLoadMoreTemplate();
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
