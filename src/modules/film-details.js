/*
* Набор импортированный значений
* */

import Component from './component';
import moment from "moment";

/*
* Набор констант
* */

const Keycode = {
  ENTER: 13,
  ESC: 27,
};

const Emotion = {
  [`sleeping`]: `😴`,
  [`neutral-face`]: `😐`,
  [`grinning`]: `😀`,
};

const Rating = {
  MINIMUM_VALUE: 1,
  MAXIMUM_VALUE: 10,
};

/*
* Набор экспортируемых значений
* */

export default class FilmDetails extends Component {
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

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onClose = null;

    this._onScoreChange = this._onScoreChange.bind(this);
    this._onCommentPosting = this._onCommentPosting.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);

    this._onAddToWatchlistClick = this._onAddToWatchlistClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);

    this._onChangeForm = null;
  }

  static createMapper(target) {
    return {
      watchlist: (value) => {
        target.isWatchlist = value;
      },
      watched: (value) => {
        target.isWatched = value;
      },
      favorite: (value) => {
        target.isFavorite = value;
      },
      score: (value) => {
        target.userRating = value;
      },
      [`comment-emoji`]: (value) => {
        target.emoji = value;
      },
      comment: (value) => {
        target.comment = {
          text: value,
          author: `Me`,
          date: 0,
        };
      },
    };
  }

  static _processForm(formData) {
    const entry = {
      comment: {},
      emoji: ``,
      userRating: null,
      isWatchlist: false,
      isWatched: false,
      isFavorite: false,
    };

    const filmDetailsMapper = FilmDetails.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (filmDetailsMapper[property]) {
        filmDetailsMapper[property](value);
      }
    }

    return entry;
  }

  /* Изменение оценки фильма пользователя */
  _onScoreChange(evt) {
    this.userRating = evt.target.value;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  /* Добавление нового комментария пользователем */
  _onCommentPosting(evt) {
    if (evt.keyCode === Keycode.ENTER && evt.ctrlKey) {
      evt.preventDefault();

      this.comments.push({
        comment: evt.target.value,
        author: `Me`,
        date: new Date().getTime(),
        emotion: document.querySelector(`.film-details__emoji-item:checked`).value,
      });

      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = FilmDetails._processForm(formData);
      newData.comments = this.comments;

      if (typeof this._onClose === `function`) {
        this._onChangeForm(newData);
      }

      this.unbind();
      this._partialUpdate();
      this.bind();
    }
  }

  set onChangeForm(callback) {
    this._onChangeForm = callback;
  }

  /* Закрытие попапа */
  _onCloseButtonClick() {
    if (typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  set onClose(callback) {
    this._onClose = callback;
  }

  _onEscKeydown(evt) {
    if (evt.keyCode === Keycode.ESC) {
      evt.preventDefault();
      if (typeof this._onEsc === `function`) {
        this._onEsc();
      }
    }
  }

  set onEsc(callback) {
    this._onEsc = callback;
  }

  _onAddToWatchlistClick() {
    if (typeof this._onAddToWatchlist === `function`) {
      this._onAddToWatchlist();
    }
  }

  set onAddToWatchlist(callback) {
    this._onAddToWatchlist = callback;
  }

  _onMarkAsWatchedClick() {
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  set onMarkAsWatched(callback) {
    this._onMarkAsWatched = callback;
  }

  _onMarkAsFavoriteClick() {
    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite();
    }
  }

  set onMarkAsFavorite(callback) {
    this._onMarkAsFavorite = callback;
  }

  get template() {
    const userRating = this.userRating;
    let ratings = ``;
    for (let i = Rating.MINIMUM_VALUE; i <= Rating.MAXIMUM_VALUE; i++) {
      ratings += `
            <input type="radio" name="score"
              class="film-details__user-rating-input visually-hidden"
              value="${i}" id="rating-${i}" ${userRating.toString() === i.toString() ? `checked` : ``}>
            <label class="film-details__user-rating-label"
              for="rating-${i}">${i}</label>`;
    }

    const genreNames = this.genre;
    let genres = ``;
    for (const genre of genreNames) {
      genres += `<span class="film-details__genre">${genre}</span>`;
    }

    return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this.poster}" alt="${this.title}">
    
            <p class="film-details__age">${this.ageLimit}+</p>
          </div>
    
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this.title}</h3>
                <p class="film-details__title-original">${this.altTitle}</p>
              </div>
    
              <div class="film-details__rating">
                <p class="film-details__total-rating">${this.rating}</p>
                <p class="film-details__user-rating">
                  ${this.userRating ? `Your rate ` + this.userRating : `no rating`}
                </p>
              </div>
            </div>
    
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this.writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this.actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(`${this.date}`).format(`DD MMMM YYYY`)} (${this.country})</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this.duration} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${genres}</td>
              </tr>
            </table>
    
            <p class="film-details__film-description">
              ${this.description}
            </p>
          </div>
        </div>
    
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden"
            id="watchlist" name="watchlist" ${this.isWatchlist ? `checked` : ``}>
          <label for="watchlist"
            class="film-details__control-label film-details__control-label--watchlist">
            Add to watchlist
          </label>
    
          <input type="checkbox" class="film-details__control-input visually-hidden"
            id="watched" name="watched" ${this.isWatched ? `checked` : ``}>
          <label for="watched"
            class="film-details__control-label film-details__control-label--watched">
            Already watched
          </label>
    
          <input type="checkbox" class="film-details__control-input visually-hidden"
            id="favorite" name="favorite" ${this.isFavorite ? `checked` : ``}>
          <label for="favorite"
            class="film-details__control-label film-details__control-label--favorite">
            Add to favorites
          </label>
        </section>
    
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this.comments.length}</span></h3>
    
          ${(Array.from(this.comments).map((comment) => (`
            <ul class="film-details__comments-list">
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">${Emotion[comment.emotion]}</span>
                <div>
                  <p class="film-details__comment-text">${comment.comment}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.author}</span>
                    <span class="film-details__comment-day">
                      ${moment(comment.date).fromNow()}
                    </span>
                  </p>
                </div>
              </li>
            </ul>`.trim())))}
    
          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
            </label>
          </div>
        </section>
    
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>
    
          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${this.poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>
    
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this.title}</h3>
    
              <p class="film-details__user-rating-feelings">How you feel it?</p>
    
              <div class="film-details__user-rating-score">
                ${ratings}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseButtonClick);

    this._element.querySelectorAll(`.film-details__user-rating-input`).forEach((score) => {
      score.addEventListener(`click`, this._onScoreChange);
    });

    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._onCommentPosting);

    document
      .addEventListener(`keydown`, this._onEscKeydown);

    this._element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._onAddToWatchlistClick);
    this._element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseButtonClick);

    this._element.querySelectorAll(`.film-details__user-rating-input`).forEach((score) => {
      score.removeEventListener(`click`, this._onScoreChange);
    });

    this._element.querySelector(`.film-details__comment-input`)
      .removeEventListener(`keydown`, this._onCommentPosting);

    document
      .removeEventListener(`keydown`, this._onEscKeydown);

    this._element.querySelector(`.film-details__control-label--watchlist`)
      .removeEventListener(`click`, this._onAddToWatchlistClick);
    this._element.querySelector(`.film-details__control-label--watched`)
      .removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-details__control-label--favorite`)
      .removeEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  _partialUpdate() {
    const parentElement = this._element.parentNode;
    const oldElement = this._element;
    parentElement.replaceChild(this.render(), oldElement);
  }

  update(data) {
    // this.userRating = data.userRating;
    this.isFavorite = data.isFavorite;
    this.isWatched = data.isWatched;
    this.isWatchlist = data.isWatchlist;
  }
}
