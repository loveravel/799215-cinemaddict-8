import makeFilter from '../src/modules/make-filter.js';

const FILTERS = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
  [`stats`, `Stats`],
]);

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
    }
    filtersContainer.innerHTML += makeFilter(link, name, amount, active, additional);
    active = false;
    additional = false;
  });
};

renderFilters();
