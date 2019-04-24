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

const AUTHORIZATION = `Basic sdfkjXjkl324X=12d`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

const Container = {
  MAIN: document.querySelector(`.films-list .films-list__container`),
  EXTRA: document.querySelectorAll(`.films-list--extra .films-list__container`),
  STATISTIC: document.querySelector(`.statistic`),
  FILMS: document.querySelector(`.films`),
  FILTERS: document.querySelector(`.main-navigation`),
};

const Control = {
  SHOW_MORE_BUTTON: document.querySelector(`.films-list__show-more`),
  SEARCH_FIELD: document.querySelector(`.search__field`),
};

const StatisticItem = {
  NUMBER_OF_FILMS: document.querySelector(`.footer__statistics`),
  USER_RANK: document.querySelector(`.profile__rating`),
};

const Rank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`
};

const RankCount = {
  NOVICE: {min: 1, max: 10},
  FAN: {min: 11, max: 20}
};

const NumberOfFilmsInTheMainContainer = {
  START_VALUE: 5,
  STEP: 5,
};

const Message = {
  LOAD_FILMS_PROCESS: `Loading moovies…`,
  LOAD_FILMS_ERROR: `Something went wrong while loading movies. Check your connection or try again later`,
};

/*
* Тело модуля
* */

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let numberOfFilmsInTheMainContainer;
let allFilms = [];

/* Функция для тряски */
const shake = (element) => {
  const ANIMATION_TIMEOUT = 600;
  element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, ANIMATION_TIMEOUT);
};

/* Функция для получения просмотренных фильмов */
const getWatchedFilms = (films) => films.filter((it) => it.isWatched);

/* Функция для определения ранга пользователя */
const getUserRank = (films) => {
  const watchedFilmsCount = getWatchedFilms(films).length;
  let rank = ``;

  if (watchedFilmsCount >= RankCount.NOVICE.min && watchedFilmsCount <= RankCount.NOVICE.max) {
    rank = Rank.NOVICE;
  } else if (watchedFilmsCount >= RankCount.FAN.min && watchedFilmsCount <= RankCount.FAN.max) {
    rank = Rank.FAN;
  } else if (watchedFilmsCount > RankCount.FAN.max) {
    rank = Rank.MOVIE_BUFF;
  }

  StatisticItem.USER_RANK.innerHTML = `You rank: ${rank}!`;
  return rank;
};

/* Функция для вывода статистики о кол-ве фильмов на сайте */
const showNumberOfFilmsInFooter = (films) => {
  const footerStatistics = document.querySelector(`.footer__statistics p`);
  footerStatistics.innerHTML = `${films.length} movies inside`;
};

/* Функция для определения двух самых высокорейтинговых фильмов */
const getFilmsTopRatings = (films) => {
  return films.sort((prevFilm, nextFilm) => {
    return nextFilm.rating - prevFilm.rating;
  }).slice(0, 2);
};

/* Функция для определения двух самых коментируемых фильмов */
const getFilmsTopComments = (films) => {
  return films.sort((prevFilm, nextFilm) => {
    return nextFilm.comments.length - prevFilm.comments.length;
  }).slice(0, 2);
};

/* Функция для рендера фильмов */
const renderFilms = (container, filmsData, mainBlockBool) => {
  container.innerHTML = ``;
  for (const filmData of filmsData) {
    filmData.mainBlock = mainBlockBool;
    const film = new Film(filmData);
    const filmDetails = new FilmDetails(filmData);

    container.appendChild(film.render());

    film.onDetails = () => {
      if (document.querySelector(`.film-details`)) {
        document.querySelector(`.film-details`).remove();
      }
      const filmDetailsElement = filmDetails.render();
      document.body.appendChild(filmDetailsElement);
    };


    /* Добавление в списки */
    film.onAddToWatchlist = () => {
      filmData.isWatchlist = !filmData.isWatchlist;
      updateData(film.element);
    };
    film.onMarkAsWatched = () => {
      filmData.isWatched = !filmData.isWatched;
      updateData(film.element);
    };
    film.onMarkAsFavorite = () => {
      filmData.isFavorite = !filmData.isFavorite;
      updateData(film.element);
    };
    filmDetails.onAddToWatchlist = () => {
      filmData.isWatchlist = !filmData.isWatchlist;
      updateData(filmDetails.element.querySelector(`.film-details__controls`));
    };
    filmDetails.onMarkAsWatched = () => {
      filmData.isWatched = !filmData.isWatched;
      updateData(filmDetails.element.querySelector(`.film-details__controls`));
    };
    filmDetails.onMarkAsFavorite = () => {
      filmData.isFavorite = !filmData.isFavorite;
      updateData(filmDetails.element.querySelector(`.film-details__controls`));
    };

    filmDetails.onChangeForm = (newObject) => {
      filmData.userRating = newObject.userRating;
      filmData.comments = newObject.comments;
      updateData(filmDetails.element.querySelector(`.film-details__inner`));
    };

    filmDetails.onClose = () => {
      filmDetails.unrender();
    };

    filmDetails.onEsc = () => {
      filmDetails.unrender();
    };

    const updateData = (element) => {
      /* Функция для блокировки полей при отправке комментария */
      const block = () => {
        element.disabled = true;
      };
      /* Функция для разблокировки полей при отправке комментария */
      const unblock = () => {
        element.disabled = false;
      };
      block();

      api.updateFilm({id: filmData.id, data: filmData.toRAW()})
        .then((newFilm) => {
          unblock();
          film.update(newFilm);
          filmDetails.update(newFilm);
          renderFilters(Container.FILTERS, allFilms);
          getUserRank(allFilms);
        })
        .catch(() => {
          shake(element);
          unblock();
        });
    };
  }
};

/*
* Фильтры
* */

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

const renderFilters = (container, films) => {
  Container.FILTERS.innerHTML = ``;
  const filtersData = data.getFiltersData(films);
  filtersData.forEach((filterData) => {
    filterData.count = doFilmsFiltering(films, filterData.name.toLowerCase()).length;
    const filter = new Filter(filterData);

    container.appendChild(filter.render());

    if (filter.name === `Stats`) {
      filter.element.classList.add(`main-navigation__item--additional`);

      const onStatsItemClick = () => {
        Container.STATISTIC.classList.remove(`visually-hidden`);
        Container.FILMS.classList.add(`visually-hidden`);
        renderStatistic(films, getUserRank(films));
        const activeFilter = document.querySelector(`.main-navigation__item--active`);
        activeFilter.classList.remove(`main-navigation__item--active`);
        filter.element.classList.add(`main-navigation__item--active`);
      };

      filter.element.addEventListener(`click`, onStatsItemClick);
    }

    filter.onClick = () => {
      const filterActive = document.querySelector(`.main-navigation__item--active`);
      if (filterActive) {
        filterActive.classList.remove(`main-navigation__item--active`);
      }
      filter.element.classList.add(`main-navigation__item--active`);
      Container.STATISTIC.classList.add(`visually-hidden`);
      Container.FILMS.classList.remove(`visually-hidden`);
      const filteredFilms = doFilmsFiltering(films, filter.name.toLowerCase());
      if (Control.SHOW_MORE_BUTTON.classList.contains(`visually-hidden`)) {
        Control.SHOW_MORE_BUTTON.classList.remove(`visually-hidden`);
      }
      renderFilmsByCategory(filteredFilms);
    };
  });
};

const renderFilmsByCategory = (films) => {
  const topFilms = getFilmsTopRatings(films);
  Container.EXTRA[0].innerHTML = ``;
  renderFilms(Container.EXTRA[0], topFilms, false);

  const mostFilms = getFilmsTopComments(films);
  Container.EXTRA[1].innerHTML = ``;
  renderFilms(Container.EXTRA[1], mostFilms, false);

  numberOfFilmsInTheMainContainer = NumberOfFilmsInTheMainContainer.START_VALUE;
  hideShowMoreButton(numberOfFilmsInTheMainContainer, films.length);

  let mainFilms = films;
  Container.MAIN.innerHTML = ``;
  renderFilms(Container.MAIN, mainFilms.slice(0, numberOfFilmsInTheMainContainer), true);

  const onShowMoreButtonClick = () => {
    Container.MAIN.innerHTML = ``;
    numberOfFilmsInTheMainContainer += NumberOfFilmsInTheMainContainer.STEP;
    renderFilms(Container.MAIN, mainFilms.slice(0, numberOfFilmsInTheMainContainer), true);
    hideShowMoreButton(numberOfFilmsInTheMainContainer, films.length);
  };
  Control.SHOW_MORE_BUTTON.addEventListener(`click`, onShowMoreButtonClick);
};

const hideShowMoreButton = (filmsNow, filmsMaximum) => {
  if (filmsNow >= filmsMaximum) {
    Control.SHOW_MORE_BUTTON.classList.add(`visually-hidden`);
  }
};

/*
* Search
* */

const doSearch = (evt, films) => {
  Container.MAIN.innerHTML = ``;

  const filmsAfterSearch = films.filter((film) => {
    return film.title.toLowerCase().match(Control.SEARCH_FIELD.value.toLowerCase());
  });

  renderFilms(Container.MAIN, filmsAfterSearch.slice(0, numberOfFilmsInTheMainContainer), true);
};

/*
* Render
* */

api.getFilms()
  .then((films) => {
    allFilms = films;
    renderFilmsByCategory(films, numberOfFilmsInTheMainContainer);
    renderFilters(Container.FILTERS, films);
    getUserRank(films);
    showNumberOfFilmsInFooter(films);
    Control.SEARCH_FIELD.addEventListener(`input`, function (evt) {
      doSearch(evt, films);
    });
  })
  .catch(() => {
    Container.FILMS.innerHTML = Message.LOAD_FILMS_ERROR;
  });
