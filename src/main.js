/*
* Набор импортированный значений
* */

import Film from './modules/film.js';
import FilmDetails from './modules/film-details.js';
import Filter from './modules/filter.js';
import * as data from './data.js';
import renderStatistic from './modules/statistic.js';

/*
* Тело модуля
* */

/*
* Фильмы
* */

const DefaultNumberOfFilms = {
  ALL: 7,
  EXTRA: 2,
};

const getFilmsData = (amount) => {
  const films = [];
  for (let i = 0; i < amount; i++) {
    films.push(data.getFilmData());
  }
  return films;
};

const initialFilmsData = getFilmsData(DefaultNumberOfFilms.ALL);

const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

const renderFilms = (container, filmsData) => {
  container.innerHTML = ``;
  for (let i = 0; i < filmsData.length; i++) {
    const film = new Film(filmsData[i]);
    const filmDetails = new FilmDetails(filmsData[i]);

    container.appendChild(film.render());

    film.onDetails = () => {
      const filmDetailsElement = filmDetails.render();
      document.body.appendChild(filmDetailsElement);
    };

    film.onAddToWatchlist = () => {
      filmsData[i].list.isWatchlist = !filmsData[i].list.isWatchlist;
      filmDetails.update(filmsData[i]);
    };

    film.onMarkAsWatched = () => {
      filmsData[i].list.isWatched = !filmsData[i].list.isWatched;
      filmDetails.update(filmsData[i]);
    };

    film.onMarkAsFavorite = () => {
      filmsData[i].list.isFavorite = !filmsData[i].list.isFavorite;
      filmDetails.update(filmsData[i]);
    };

    filmDetails.onChangeForm = (newObject) => {
      filmsData[i].userRating = newObject.userRating;
      filmsData[i].comments = newObject.comments;

      filmDetails.update(filmsData[i]);
      film.update(filmsData[i]);
    };

    filmDetails.onClose = () => {
      filmDetails.unrender();
    };
  }
};

renderFilms(filmsContainer, initialFilmsData);

const renderFilmsExtra = (filmsData) => {
  filmsExtraContainers.forEach((extraContainer) => {
    renderFilms(extraContainer, filmsData);
  });
};

renderFilmsExtra(initialFilmsData.slice(0, DefaultNumberOfFilms.EXTRA));

/*
* Фильтры
* */

const filtersContainer = document.querySelector(`.main-navigation`);
const statisticItem = document.querySelector(`.main-navigation__item--additional`);

const doFilmsFiltering = (films, filterName) => {
  switch (filterName) {
    case `all movies`:
      return films;

    case `watchlist`:
      return films.filter((it) => it.list.isWatchlist);

    case `history`:
      return films.filter((it) => it.list.isWatched);

    case `favorites`:
      return films.filter((it) => it.list.isFavorite);

    default: return films;
  }
};

const renderFilters = (container, insertionPoint) => {
  const filtersData = data.getFiltersData();
  filtersData.forEach((filterData) => {
    const filter = new Filter(filterData);

    container.insertBefore(filter.render(), insertionPoint);

    filter.onClick = () => {
      const filterActive = document.querySelector(`.main-navigation__item--active`);
      if (filterActive) {
        filterActive.classList.remove(`main-navigation__item--active`);
      }
      filter.element.classList.add(`main-navigation__item--active`);
      statisticBlock.classList.add(`visually-hidden`);
      filmsBlock.classList.remove(`visually-hidden`);
      const filteredFilms = doFilmsFiltering(initialFilmsData, filter.name.toLowerCase());
      renderFilms(filmsContainer, filteredFilms);
    };
  });
};

renderFilters(filtersContainer, statisticItem);

/*
* Статистика
* */

const statisticBlock = document.querySelector(`.statistic`);
const filmsBlock = document.querySelector(`.films`);

const onStatsItemClick = () => {
  statisticBlock.classList.remove(`visually-hidden`);
  filmsBlock.classList.add(`visually-hidden`);
  renderStatistic(initialFilmsData);
  const activeFilter = document.querySelector(`.main-navigation__item--active`);
  activeFilter.classList.remove(`main-navigation__item--active`);
  statisticItem.classList.add(`main-navigation__item--active`);
};

statisticItem.addEventListener(`click`, onStatsItemClick);
