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
    this.id = data.id;
    this.title = data.title;
    this.altTitle = data.altTitle;
    this.rating = data.rating;
    this.userRating = data.userRating;
    this.duration = data.duration;
    this.genre = data.genre;
    this.poster = data.poster;
    this.description = data.description;
    this.ageLimit = data.ageLimit;
    this.country = data.country;
    this.director = data.director;
    this.writers = data.writers;
    this.actors = data.actors;
    this.comments = data.comments;
    this.date = data.date;

    this.isWatched = data.isWatched;
    this.isWatchlist = data.isWatchlist;
    this.isFavorite = data.isFavorite;

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
    const duration = tools.getTimeFromMinutes(this.duration);

    if (this.description.length > 140) {
      this.description = `${this.description.substring(0, 137)}...`;
    }

    const controls = `
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>`;

    return `
    <article class="film-card">
      <h3 class="film-card__title">${this.title}</h3>
      <p class="film-card__rating">${this.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(`${this.date}`).year()}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${this.genre[0]}</span>
      </p>
      <img src="${this.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this.description}</p>
      <button class="film-card__comments">${this.comments.length} comments</button>
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
    const parentElement = this._element.parentNode;
    const oldElement = this._element;
    parentElement.replaceChild(this.render(), oldElement);
  }

  update(data) {
    this.comments = data.comments;

    this.unbind();
    this._partialUpdate();
    this.bind();
  }
}
