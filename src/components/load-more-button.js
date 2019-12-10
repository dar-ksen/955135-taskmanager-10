import AbstractComponent from './abstract-component';

const getButtonLoadMoreTemplate = () => {
  return (`
    <button class="load-more js-load-more" type="button">load more</button>
  `);
};

export default class LoadMoreButton extends AbstractComponent {

  getTemplate() {
    return getButtonLoadMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
