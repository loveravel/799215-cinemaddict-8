/*
* Набор импортированный значений
* */

import Component from './component';
import * as tools from '../tools.js';
import moment from "moment";

/*
* Набор экспортируемых значений
* */

export default class Film extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._rating = data.rating;
    this._date = data.date;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._comments = data.comments;

    this._mainBlock = data.mainBlock;

    this._onDetails = null;

    this._onAddToWatchlist = null;

    this._onCommentsButtonClick = this._onCommentsButtonClick.bind(this);
    this._onAddToWatchlistClick = this._onAddToWatchlistClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  _onCommentsButtonClick() {
    if (typeof this._onDetails === `function`) {
      this._onDetails();
    }
  }

  set onDetails(callback) {
    this._onDetails = callback;
  }

  _onAddToWatchlistClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchlist === `function`) {
      this._onAddToWatchlist();
    }
  }

  set onAddToWatchlist(callback) {
    this._onAddToWatchlist = callback;
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  set onMarkAsWatched(callback) {
    this._onMarkAsWatched = callback;
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite();
    }
  }

  set onMarkAsFavorite(callback) {
    this._onMarkAsFavorite = callback;
  }

  get template() {
    const duration = tools.getTimeFromMinutes(this._duration);

    const controls = `
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>`;

    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(`${this._date}`).year()}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${this._genre[0]}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>
      ${this._mainBlock ? controls : ``}
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onCommentsButtonClick);

    if (this._mainBlock) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .addEventListener(`click`, this._onAddToWatchlistClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .addEventListener(`click`, this._onMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--favorite`)
        .addEventListener(`click`, this._onMarkAsFavoriteClick);
    }
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onCommentsButtonClick);

    if (this._mainBlock) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .removeEventListener(`click`, this._onAddToWatchlistClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .removeEventListener(`click`, this._onMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .removeEventListener(`click`, this._onMarkAsFavoriteClick);
    }
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
    const newElement = this._element.parentElement.insertBefore(this._element.firstChild, this._element);
    this._element.remove();
    this._element = newElement;
  }

  update(data) {
    this._comments = data.comments;

    this.unbind();
    this._partialUpdate();
    this.bind();
  }
}
