/*
* Набор импортированный значений
* */

import makeFilter from '../src/modules/make-filter.js';
import Card from '../src/modules/card.js';
import CardDetails from '../src/modules/card-details.js';
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


/* Рендер карточек */

const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

const renderFilms = (container, amount) => {
  for (let i = 0; i < amount; i++) {
    const cardData = data.createCardData();
    const card = new Card(cardData);
    const cardDetails = new CardDetails(cardData);

    container.appendChild(card.render());

    card.onDetails = () => {
      const cardDetailsElement = cardDetails.render();
      document.body.appendChild(cardDetailsElement);

      cardDetails.onClose = () => {
        cardDetails.unrender();
      };
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
