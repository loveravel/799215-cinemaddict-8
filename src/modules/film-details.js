/*
* Набор импортированный значений
* */

import Component from './component';

/*
* Набор констант
* */

const KEYCODE = {
  ENTER: 13,
  ESC: 27,
};

const EMOJI = {
  [`sleeping`]: `😴`,
  [`neutral-face`]: `😐`,
  [`grinning`]: `😀`,
};

/*
* Набор экспортируемых значений
* */

export default class FilmDetails extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._userRating = data.userRating;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._ageLimit = data.ageLimit;
    this._country = data.country;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._comments = data.comments;
    this._releaseDate = data.date.releaseDate;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onClose = null;

    this._onScoreChange = this._onScoreChange.bind(this);
    this._onCommentPosting = this._onCommentPosting.bind(this);

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
          date: new Date(),
        };
      },
    };
  }

  static _processForm(formData) {
    const entry = {
      comment: ``,
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
    this._userRating = evt.target.value;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  /* Добавление нового комментария пользователем */
  _onCommentPosting(evt) {
    if (evt.keyCode === KEYCODE.ENTER && evt.ctrlKey) {
      evt.preventDefault();

      this._comments.push({
        sentence: evt.target.value,
        person: `Me`,
        date: new Date().getFullYear(),
        emoji: EMOJI[document.querySelector(`.film-details__emoji-item:checked`).value],
      });

      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = FilmDetails._processForm(formData);
      newData.comments = this._comments;

      if (typeof this._onClose === `function`) {
        this._onChangeForm(newData);
      }

      this.unbind();
      this._partialUpdate();
      this.bind();
    }
  }

  set onChangeForm(fn) {
    this._onChangeForm = fn;
  }

  /* Закрытие попапа */
  _onCloseButtonClick() {
    if (typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  get template() {
    const userRating = this._userRating;
    let ratings = ``;
    for (let i = 1; i <= 10; i++) {
      ratings += `
            <input type="radio" name="score"
              class="film-details__user-rating-input visually-hidden"
              value="${i}" id="rating-${i}" ${userRating === i.toString() ? `checked` : ``}>
            <label class="film-details__user-rating-label"
              for="rating-${i}">${i}</label>`;
    }

    return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="images/posters/${this._poster}.jpg" alt="${this._title}">
    
            <p class="film-details__age">${this._ageLimit}</p>
          </div>
    
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">${this._title}</p>
              </div>
    
              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">
                  ${this._userRating ? `Your rate ` + this._userRating : `no rating`}
                </p>
              </div>
            </div>
    
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${this._releaseDate} (${this._country})</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._duration} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${this._genre}</span>
                  <span class="film-details__genre">${this._genre}</span>
                  <span class="film-details__genre">${this._genre}</span></td>
              </tr>
            </table>
    
            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>
    
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
    
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
    
          ${(Array.from(this._comments).map((comment) => (`
            <ul class="film-details__comments-list">
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">${comment.emoji}</span>
                <div>
                  <p class="film-details__comment-text">${comment.sentence}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.person}</span>
                    <span class="film-details__comment-day">${comment.date}</span>
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
              <img src="images/posters/${this._poster}.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>
    
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>
    
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
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseButtonClick);

    this._element.querySelectorAll(`.film-details__user-rating-input`).forEach((score) => {
      score.removeEventListener(`click`, this._onScoreChange);
    });

    this._element.querySelector(`.film-details__comment-input`)
      .removeEventListener(`keydown`, this._onCommentPosting);
  }

  update(data) {
    this._userRating = data.userRating;
  }
}