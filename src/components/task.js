import AbstractComponent from './abstract-component';

import { formatTime, formatDate, isRepeating, isOverdueDate } from '../utils/common';

const getHashtagsTemplate = (tags) => {
  return tags.map((tag) => {
    return (
      `<span class="card__hashtag-inner">
          <span class="card__hashtag-name">
            #${tag}
          </span>
        </span>`
    );
  }).join(`\n`);
};

const createButtonTemplate = (name, isActive) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} js-card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
    >
      ${name}
    </button>`
  );
};

const getTaskTemplate = (task) => {
  const { description, tags, dueDate, color, repeatingDays } = task;

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  const isDateShowing = Boolean(dueDate);

  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const hashtagsTemplate = getHashtagsTemplate(tags);

  const editButton = createButtonTemplate(`edit`, true);
  const archiveButton = createButtonTemplate(`archive`, task.isArchived);
  const favoritesButton = createButtonTemplate(`favorites`, task.isFavored);

  const repeatClass = isRepeating(repeatingDays) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${editButton}
            ${archiveButton}
            ${favoritesButton}
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtagsTemplate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return getTaskTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.js-card__btn--edit`)
    .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.js-card__btn--favorites`)
    .addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.js-card__btn--archive`)
    .addEventListener(`click`, handler);
  }
}
