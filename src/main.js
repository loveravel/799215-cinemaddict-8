import makeFilter from '../src/modules/make-filter.js';
import makeCard from '../src/modules/make-card.js';
import makeFilmsExtra from '../src/modules/make-films-extra';

const FILTERS = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
  [`stats`, `Stats`],
]);

const FILM_EXTRA_NAMES = [
  `Top rated`,
  `Most commented`,
];

/* Функция для генерирования случайного числа от min до max */
const getRandomInteger = (minimumNumber, maximumNumber) => {
  let randomNumber = minimumNumber + Math.random() * (maximumNumber - minimumNumber + 1);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

const filtersContainer = document.querySelector(`.main-navigation`);

const renderFilters = () => {
  let active = false;
  let additional = false;
  FILTERS.forEach((name, link) => {
    let amount = getRandomInteger(0, 100);
    if (link === `all`) {
      active = true;
      amount = 0;
    }
    if (link === `stats`) {
      additional = true;
      amount = 0;
    }
    filtersContainer.innerHTML += makeFilter(link, name, amount, active, additional);
    active = false;
    additional = false;
  });
};

renderFilters();

const filmsSection = document.querySelector(`.films`);
const filmsContainer = document.querySelector(`.films-list .films-list__container`);

const renderCards = (container, amount) => {
  const cards = new Array(amount)
    .fill()
    .map(makeCard);
  container.insertAdjacentHTML(`beforeend`, cards.join(``));
};

renderCards(filmsContainer, 7);

const renderFilmsExtra = (namesExtra, amount) => {
  namesExtra.forEach((nameExtra) => {
    filmsSection.innerHTML += makeFilmsExtra(nameExtra);
  });

  const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
  filmsExtraContainers.forEach((extraContainer) => {
    renderCards(extraContainer, amount);
  });
};

renderFilmsExtra(FILM_EXTRA_NAMES, 2);
