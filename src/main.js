/*
* Набор импортированный значений
* */

import makeFilter from '../src/modules/make-filter.js';
import makeCard from '../src/modules/make-card.js';
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

const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

const renderFilms = (container, amount) => {
  const genres = Array.from(data.card.genre);
  const posters = Array.from(data.card.poster);

  for (let i = 0; i < amount; i++) {
    const card = makeCard(data.card.title[tools.getRandomInteger(0, data.card.title.length - 1)],
        data.card.rating[tools.getRandomInteger(0, data.card.rating.length - 1)],
        data.card.date - tools.getRandomInteger(0, 30),
        data.card.duration[tools.getRandomInteger(0, data.card.duration.length - 1)],
        genres[tools.getRandomInteger(0, genres.length - 1)],
        posters[tools.getRandomInteger(0, posters.length - 1)],
        data.card.description[tools.getRandomInteger(0, data.card.description.length - 1)],
        data.card.comments[tools.getRandomInteger(0, data.card.comments.length - 1)]);
    container.insertAdjacentHTML(`beforeend`, card);
  }
};

renderFilms(filmsContainer, DEFAULT_AMOUNT_CARDS.All);

const renderFilmsExtra = (amountCards) => {
  filmsExtraContainers.forEach((extraContainer) => {
    renderFilms(extraContainer, amountCards);
  });
};

renderFilmsExtra(DEFAULT_AMOUNT_CARDS.Extra);


/* Обработка события клика по фильтру */
const filterElements = document.querySelectorAll(`.main-navigation__item`);
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
