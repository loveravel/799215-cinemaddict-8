/*
* Набор импортированный значений
* */

import Component from './component';

/*
* Набор экспортируемых значений
* */

export default class Card extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._yearOfIssue = data.yearOfIssue;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._comment = data.comment;

    this._onDetails = null;
  }

  _onCommentsButtonClick() {
    if (typeof this._onDetails === `function`) {
      this._onDetails();
    }
  }

  set onDetails(fn) {
    this._onDetails = fn;
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._yearOfIssue}</span>
        <span class="film-card__duration">${this._duration} min</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="./images/posters/${this._poster}.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comment}</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onCommentsButtonClick.bind(this));
  }
}
