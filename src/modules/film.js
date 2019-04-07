/*
* Набор импортированный значений
* */

import Component from './component';
import * as tools from '../tools.js';

/*
* Набор экспортируемых значений
* */

export default class Film extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._yearOfIssue = data.date.yearOfIssue;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._comments = data.comments;

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

  set onDetails(fn) {
    this._onDetails = fn;
  }

  _onAddToWatchlistClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchlist === `function`) {
      this._onAddToWatchlist();
    }
  }

  set onAddToWatchlist(fn) {
    this._onAddToWatchlist = fn;
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite();
    }
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  get template() {
    const duration = tools.getTimeFromMinutes(this._duration);

    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._yearOfIssue}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="./images/posters/${this._poster}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onCommentsButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchlistClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onCommentsButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .removeEventListener(`click`, this._onAddToWatchlistClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .removeEventListener(`click`, this._onMarkAsFavoriteClick);
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
