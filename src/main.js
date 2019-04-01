/*
* Набор импортированный значений
* */

import makeFilter from '../src/modules/make-filter.js';
import Film from './modules/film.js';
import FilmDetails from './modules/film-details.js';
import * as tools from '../src/tools.js';
import * as data from '../src/data.js';

/*
* Список констант
* */

const DEFAULT_AMOUNT_CARDS = {
  All: 7,
  Extra: 2,
};

const FILTERS = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
]);

/*
* Тело модуля
* */

const statsItem = document.querySelector(`.main-navigation__item--additional`);

const renderFilters = (insertionPoint, howToInsert) => {
  let amountFilms;
  let active = false;
  FILTERS.forEach((name, link) => {
    if (link === `all`) {
      active = true;
    } else {
      amountFilms = tools.getRandomInteger(0, 10);
    }
    const filter = makeFilter(link, name, amountFilms, active);
    insertionPoint.insertAdjacentHTML(howToInsert, filter);
    active = false;
  });
};

renderFilters(statsItem, `beforebegin`);

/* Обработка события клика по фильтру */

const filterElements = document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);
filterElements.forEach((filter) => {
  filter.addEventListener(`click`, () => {
    filmsContainer.innerHTML = ``;
    filmsExtraContainers.forEach((extraContainer) => {
      extraContainer.innerHTML = ``;
    });

    document.querySelector(`.main-navigation__item--active`).
    classList.remove(`main-navigation__item--active`);
    filter.classList.add(`main-navigation__item--active`);

    renderFilms(filmsContainer, tools.getRandomInteger(1, 10));
    renderFilmsExtra(tools.getRandomInteger(1, 4));
  });
});


/* Рендер карточек */

const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

const renderFilms = (container, amount) => {
  for (let i = 0; i < amount; i++) {
    const filmData = data.getFilmData();
    const film = new Film(filmData);
    const filmDetails = new FilmDetails(filmData);

    container.appendChild(film.render());

    film.onDetails = () => {
      const filmDetailsElement = filmDetails.render();
      document.body.appendChild(filmDetailsElement);
    };

    filmDetails.onChangeForm = (newObject) => {
      filmData.userRating = newObject.userRating;
      filmData.comments = newObject.comments;

      filmDetails.update(filmData);
      film.update(filmData);
    };

    filmDetails.onClose = () => {
      filmDetails.unrender();
    };
  }
};

renderFilms(filmsContainer, DEFAULT_AMOUNT_CARDS.All);

const renderFilmsExtra = (amountCards) => {
  filmsExtraContainers.forEach((extraContainer) => {
    renderFilms(extraContainer, amountCards);
  });
};

renderFilmsExtra(DEFAULT_AMOUNT_CARDS.Extra);
