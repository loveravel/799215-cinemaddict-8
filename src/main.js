import makeFilter from '../src/modules/make-filter.js';
import makeCard from '../src/modules/make-card.js';

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

/* Функция для генерирования случайного числа от min до max */
const getRandomInteger = (minimumNumber, maximumNumber) => {
  let randomNumber = minimumNumber + Math.random() * (maximumNumber - minimumNumber + 1);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

const statsItem = document.querySelector(`.main-navigation__item--additional`);

const renderFilters = (insertionPoint, howToInsert) => {
  let amountFilms;
  let active = false;
  FILTERS.forEach((name, link) => {
    if (link === `all`) {
      active = true;
    } else {
      amountFilms = getRandomInteger(0, 10);
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
  const cards = new Array(amount)
    .fill()
    .map(makeCard);
  container.insertAdjacentHTML(`beforeend`, cards.join(``));
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

    renderFilms(filmsContainer, getRandomInteger(1, 10));
    renderFilmsExtra(getRandomInteger(1, 4));
  });
});
