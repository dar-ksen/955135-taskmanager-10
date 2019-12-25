import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import he from 'he';
import debounce from 'lodash/debounce';
import AbstractSmartComponent from './abstract-smart-component';

import { COLORS, DAYS } from '../const';
import { formatTime, formatDate, isRepeating, isOverdueDate } from '../utils/common';

const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 140;

const hasValidDescriptionLength = (description) => {
  const length = description.length;

  return length >= MIN_DESCRIPTION_LENGTH &&
    length <= MAX_DESCRIPTION_LENGTH;
};

const getColorsTemplate = (colors, currentColor) => {
  return colors
    .map((color) => (`
      <input
        type="radio"
        id="color-${color}-4"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${currentColor === color ? `checked` : ``}
      />
      <label
        for="color-${color}-4"
        class="card__color card__color--${color}"
        >${color}</label
      >
      `)
    )
    .join(`\n`);
};

const getRepeatingDaysTemplate = (days, repeatingDays) => {
  return days
    .map((day) => {
      const isChecked = repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-4"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-4"
          >${day}</label
        >`
      );
    })
    .join(`\n`);
};

const getHashtagsTemplate = (tags) => {
  return tags
    .map((tag) => {
      return (
        `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value=${tag}
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${tag}
          </p>
          <button
              type="button"
              class="card__hashtag-delete"
          >
            delete
          </button>
        </span>`
      );
    })
    .join(`\n`);
};

const getTaskEditTemplate = (task, options = {}) => {
  const { tags, dueDate } = task;
  const { isDateShowing, isRepeatingTask, activeRepeatingDays, currentDescription, currentColor } = options;

  const description = he.encode(currentDescription);

  const hashtagsTemplate = getHashtagsTemplate(tags);
  const colorsTemplate = getColorsTemplate(COLORS, currentColor);
  const repeatingDaysTemplate = getRepeatingDaysTemplate(DAYS, activeRepeatingDays);

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  const isSaveButtonDisabled = (isDateShowing && isRepeatingTask) ||
    (isRepeatingTask && !isRepeating(activeRepeatingDays)) ||
    !hasValidDescriptionLength(description);

  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--edit card--${currentColor} ${repeatClass} ${deadlineClass}">
      <form class="card__form js-card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text js-card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle js-card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                  </button>

                  ${isDateShowing ? `<fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date js-card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${date} ${time}"
                          />
                        </label>
                      </fieldset>` : ``}

                  <button class="card__repeat-toggle js-card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                  </button>

                  ${isRepeatingTask ? `<fieldset class="card__repeat-days js-card__repeat-days">
                      <div class="card__repeat-days-inner">
                        ${repeatingDaysTemplate}
                      </div>
                    </fieldset>` : `` }
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${hashtagsTemplate}
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <div class="card__colors-inner js-card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsTemplate}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save js-card__save" type="submit" ${isSaveButtonDisabled ? `disabled` : ``}>save</button>
              <button class="card__delete js-card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
  );
};

const parseFormData = (formData) => {
  const repeatingDays = DAYS.reduce((acc, dayName) => {
    acc[dayName] = false;
    return acc;
  }, {});

  const date = formData.get(`date`);

  return {
    description: formData.get(`text`),
    color: formData.get(`color`),
    tags: formData.getAll(`hashtag`),
    dueDate: date ? new Date(date) : null,
    repeatingDays: formData.getAll(`repeat`).reduce((acc, dayName) => {
      acc[dayName] = true;
      return acc;
    }, repeatingDays),
  };
};

export default class InEditTask extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = Boolean(task.dueDate);
    this._isRepeatingTask = isRepeating(task.repeatingDays);
    this._activeRepeatingDays = { ...task.repeatingDays };
    this._currentDescription = task.description;
    this._currentColor = task.color;
    this._flatpickr = null;
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    const options = {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
      currentDescription: this._currentDescription,
      currentColor: this._currentColor,
    };
    return getTaskEditTemplate(this._task, options);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.js-card__form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = Boolean(task.dueDate);
    this._isRepeatingTask = isRepeating(task.repeatingDays);
    this._activeRepeatingDays = { ...task.repeatingDays };
    this._currentDescription = task.description;

    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.js-card__form`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.js-card__delete`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const defaultDate = this._task.dueDate
        ? this._task.dueDate
        : new Date();
      const dateElement = this.getElement().querySelector(`.js-card__date`);
      this._flatpickr = flatpickr(dateElement, {
        dateFormat: `d F y H:i`,
        enableTime: true,
        allowInput: true,
        defaultDate,
      });
    }
  }

  _subscribeOnEvents() {
    const $text = this.getElement().querySelector(`.js-card__text`);
    const $date = this.getElement().querySelector(`.js-card__date-deadline-toggle`);
    const $repeat = this.getElement().querySelector(`.js-card__repeat-toggle`);
    const $repeatDay = this.getElement().querySelector(`.js-card__repeat-days`);
    const $color = this.getElement().querySelector(`.js-card__colors-inner`);

    $text.addEventListener(`input`, debounce((evt) => {
      this._currentDescription = evt.target.value;

      const saveButton = this.getElement().querySelector(`.js-card__save`);
      saveButton.disabled = !hasValidDescriptionLength(this._currentDescription);
    }, 500));

    $date.addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;
      this.rerender();
    });

    $repeat.addEventListener(`click`, () => {
      this._isRepeatingTask = !this._isRepeatingTask;
      this.rerender();
    });

    if ($repeatDay) {
      $repeatDay.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;
        this.rerender();
      });
    }

    $color.addEventListener(`change`, debounce(() => {
      this._currentColor = $color
        .querySelector(`input:checked`)
        .value;
      this.rerender();
    }, 500));
  }
}

