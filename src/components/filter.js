import { isFirst, createElement } from '../utils';

const getFilterListTemplate = (filter, isChecked) => {
  const { name, count } = filter;
  const disabled = count > 0 ? `` : `disabled`;

  return (
    `<input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${disabled}
  />
  <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__all-count">${count}</span></label
  >`
  );
};

const getFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, index) => getFilterListTemplate(filter, isFirst(index))).join(`\n`);

  return (`
  <section class="main__filter filter container">
    ${filtersMarkup}
  </section>
  `);
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return getFiltersTemplate(this._filters);
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
