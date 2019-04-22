/*
* Набор импортированный значений
* */

import Film from './modules/film.js';
import FilmDetails from './modules/film-details.js';
import Filter from './modules/filter.js';
import API from './api.js';
import * as data from './data.js';
import renderStatistic from './modules/statistic.js';

/*
* Набор констант
* */

const AUTHORIZATION = `Basic sdfkjXjkl324X`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

/*
* Тело модуля
* */

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

/*
* Фильмы
* */

const DefaultNumberOfFilms = {
  ALL: 7,
  EXTRA: 2,
};

const initialFilmsData = [];

const mainFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
const boardNoFilms = document.querySelector(`.board__no-films`);

const renderFilms = (container, filmsData) => {
  container.innerHTML = ``;
  for (const filmData of filmsData) {
    const film = new Film(filmData);
    const filmDetails = new FilmDetails(filmData);

    container.appendChild(film.render());

    film.onDetails = () => {
      const filmDetailsElement = filmDetails.render();
      document.body.appendChild(filmDetailsElement);
    };

    film.onAddToWatchlist = () => {
      filmData.isWatchlist = !filmData.isWatchlist;
      filmDetails.update(filmData);
    };

    film.onMarkAsWatched = () => {
      filmData.isWatched = !filmData.isWatched;
      filmDetails.update(filmData);
    };

    film.onMarkAsFavorite = () => {
      filmData.isFavorite = !filmData.isFavorite;
      filmDetails.update(filmData);
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
      return films.filter((it) => it.isWatchlist);

    case `history`:
      return films.filter((it) => it.isWatched);

    case `favorites`:
      return films.filter((it) => it.isFavorite);

    default: return films;
  }
};

const renderFilters = (container, films, insertionPoint) => {
  const filtersData = data.getFiltersData(films);
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
      const filteredFilms = doFilmsFiltering(films, filter.name.toLowerCase());
      renderFilms(mainFilmsContainer, filteredFilms);
    };
  });
};

const renderFilmsByCategory = (films) => {
  const topFilms = films.sort((prevFilm, nextFilm) => {
    return nextFilm.rating - prevFilm.rating;
  }).splice(0, 2);

  const mostFilms = films.sort((prevFilm, nextFilm) => {
    return nextFilm.comments.length - prevFilm.comments.length;
  }).splice(0, 2);

  let mainFilms = films;

  filmsExtraContainers[0].innerHTML = ``;
  renderFilms(filmsExtraContainers[0], topFilms);

  filmsExtraContainers[1].innerHTML = ``;
  renderFilms(filmsExtraContainers[1], mostFilms);

  mainFilmsContainer.innerHTML = ``;
  renderFilms(mainFilmsContainer, mainFilms.slice(0, amountFilms));

  const showMoreButton = document.querySelector(`.films-list__show-more`);
  const onShowMoreButtonClick = () => {
    mainFilmsContainer.innerHTML = ``;
    amountFilms += 5;
    renderFilms(mainFilmsContainer, mainFilms.slice(0, amountFilms));
    if (amountFilms === films.length) {
      showMoreButton.classList.add(`visually-hidden`);
    }
  };
  showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

  films.push(...topFilms, ...mostFilms);
};

/*
* Статистика
* */

const statisticBlock = document.querySelector(`.statistic`);
const filmsBlock = document.querySelector(`.films`);

const onStatsItemClick = (films) => {
  statisticBlock.classList.remove(`visually-hidden`);
  filmsBlock.classList.add(`visually-hidden`);
  renderStatistic(films);
  const activeFilter = document.querySelector(`.main-navigation__item--active`);
  activeFilter.classList.remove(`main-navigation__item--active`);
  statisticItem.classList.add(`main-navigation__item--active`);
};

statisticItem.addEventListener(`click`, onStatsItemClick);


/*
* Render
* */

let amountFilms = 5;

api.getFilms()
  .then((films) => {
    renderFilmsByCategory(films, amountFilms);
    renderFilters(filtersContainer, films, statisticItem);
  });

// stats --> filter
