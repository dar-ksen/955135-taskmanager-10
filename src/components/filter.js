import AbstractComponent from './abstract-component';

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

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
  const filtersTemplate = filters.map((filter) => getFilterListTemplate(filter, filter.checked)).join(`\n`);

  return (`
  <section class="main__filter filter container">
    ${filtersTemplate}
  </section>
  `);
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return getFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
