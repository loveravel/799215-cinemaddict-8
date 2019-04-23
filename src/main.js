/*
* Набор импортированный значений
* */

import Film from './modules/film.js';
import FilmDetails from './modules/film-details.js';
import Filter from './modules/filter.js';
import API from './api.js';
import * as data from './data.js';
import renderStatistic from './modules/statistic.js';
import ModelFilm from './modules/model-film.js';

/*
* Набор констант
* */

const AUTHORIZATION = `Basic sdfkjXjkl324X=12333fd`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

/*
* Тело модуля
* */

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

let amountFilmsOnMainContainer = 5;

/*
* Фильмы
* */

const mainFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const filmsExtraContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
const boardNoFilms = document.querySelector(`.board__no-films`);
const showMoreButton = document.querySelector(`.films-list__show-more`);
const searchField = document.querySelector(`.search__field`);

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
      filmDetails.update({
        isWatchlist: film.isWatchlist,
        isFavorite: film.isFavorite,
        isWatched: film.isWatched
      });
      const filmDetailsElement = filmDetails.render();
      document.body.appendChild(filmDetailsElement);
    };

    film.onAddToWatchlist = () => {
      film.isWatchlist = !film.isWatchlist;

      api.updateFilm({id: film.id, data: ModelFilm.staticToRAW(film)})
        .then(() => {
          film.unbind();
          film._partialUpdate();
          film.bind();
          // updateFilters();
        })
        .catch(() => {
          film.isWatchlist = !film.isWatchlist;
        });
    };

    film.onMarkAsWatched = () => {
      filmData.isWatched = !filmData.isWatched;

      api.updateFilm({id: film.id, data: ModelFilm.staticToRAW(film)})
        .then(() => {
          film.unbind();
          film._partialUpdate();
          film.bind();
          // updateFilters();
        })
        .catch(() => {
          film.isWatched = !film.isWatched;
        });
    };

    film.onMarkAsFavorite = () => {
      filmData.isFavorite = !filmData.isFavorite;

      api.updateFilm({id: film.id, data: ModelFilm.staticToRAW(film)})
        .then(() => {
          film.unbind();
          film._partialUpdate();
          film.bind();
          // updateFilters();
        })
        .catch(() => {
          film.isFavorite = !film.isFavorite;
        });
    };

    filmDetails.onAddToWatchlist = () => {
      filmData.isWatchlist = !filmData.isWatchlist;

      api.updateFilm({id: film.id, data: ModelFilm.staticToRAW(film)})
        .then(() => {
          film.unbind();
          film._partialUpdate();
          film.bind();
          // updateFilters();
        })
        .catch(() => {
          film.isWatchlist = !film.isWatchlist;
        });
    };

    filmDetails.onMarkAsWatched = () => {
      filmData.isWatched = !filmData.isWatched;

      api.updateFilm({id: film.id, data: ModelFilm.staticToRAW(film)})
        .then(() => {
          film.unbind();
          film._partialUpdate();
          film.bind();
          // updateFilters();
        })
        .catch(() => {
          film.isWatched = !film.isWatched;
        });
    };

    filmDetails.onMarkAsFavorite = () => {
      filmData.isFavorite = !filmData.isFavorite;

      api.updateFilm({id: film.id, data: ModelFilm.staticToRAW(film)})
        .then(() => {
          film.unbind();
          film._partialUpdate();
          film.bind();
          // updateFilters();
        })
        .catch(() => {
          film.isFavorite = !film.isFavorite;
        });
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

    filmDetails.onEsc = () => {
      filmDetails.unrender();
    };
  }
};

/*
* Фильтры
* */

const filtersContainer = document.querySelector(`.main-navigation`);

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
  const filtersData = data.getFiltersData(films);
  filtersData.forEach((filterData) => {
    filterData.count = doFilmsFiltering(films, filterData.name.toLowerCase()).length;
    const filter = new Filter(filterData);

    container.appendChild(filter.render());

    if (filter.name === `Stats`) {
      filter.element.classList.add(`main-navigation__item--additional`);

      const onStatsItemClick = () => {
        statisticBlock.classList.remove(`visually-hidden`);
        filmsBlock.classList.add(`visually-hidden`);
        renderStatistic(films);
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
      statisticBlock.classList.add(`visually-hidden`);
      filmsBlock.classList.remove(`visually-hidden`);
      const filteredFilms = doFilmsFiltering(films, filter.name.toLowerCase());
      amountFilmsOnMainContainer = 5;
      if (showMoreButton.classList.contains(`visually-hidden`)) {
        showMoreButton.classList.remove(`visually-hidden`);
      }
      renderFilmsByCategory(filteredFilms, amountFilmsOnMainContainer);
    };
  });
};
/*
const updateFilters = (filtersData, films) => {
  filtersData.forEach((filterData) => {
    filterData.count = doFilmsFiltering(films, filterData.name.toLowerCase()).length;
    filterData._partialUpdate();
  });
};*/

const renderFilmsByCategory = (films) => {
  const topFilms = films.sort((prevFilm, nextFilm) => {
    return nextFilm.rating - prevFilm.rating;
  }).slice(0, 2);

  const mostFilms = films.sort((prevFilm, nextFilm) => {
    return nextFilm.comments.length - prevFilm.comments.length;
  }).slice(0, 2);

  let mainFilms = films;

  filmsExtraContainers[0].innerHTML = ``;
  renderFilms(filmsExtraContainers[0], topFilms, false);

  filmsExtraContainers[1].innerHTML = ``;
  renderFilms(filmsExtraContainers[1], mostFilms, false);

  mainFilmsContainer.innerHTML = ``;
  renderFilms(mainFilmsContainer, mainFilms.slice(0, amountFilmsOnMainContainer), true);

  const onShowMoreButtonClick = () => {
    mainFilmsContainer.innerHTML = ``;
    amountFilmsOnMainContainer += 5;
    renderFilms(mainFilmsContainer, mainFilms.slice(0, amountFilmsOnMainContainer));
    if (amountFilmsOnMainContainer === films.length) {
      showMoreButton.classList.add(`visually-hidden`);
    }
  };
  showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
};

/*
* Статистика
* */

const statisticBlock = document.querySelector(`.statistic`);
const filmsBlock = document.querySelector(`.films`);

const showNumberOfFilmsInFooter = (films) => {
  const footerStatistics = document.querySelector(`.footer__statistics p`);
  footerStatistics.innerHTML = `${films.length} movies inside`;
};

/*
* Search
* */

const doSearch = (evt, films) => {
  mainFilmsContainer.innerHTML = ``;

  const filmsAfterSearch = films.filter((film) => {
    return film.title.match(searchField.value);
  });

  renderFilms(mainFilmsContainer, filmsAfterSearch.slice(0, amountFilmsOnMainContainer), true);
};

/*
* Render
* */

api.getFilms()
  .then((films) => {
    renderFilmsByCategory(films, amountFilmsOnMainContainer);
    renderFilters(filtersContainer, films);
    showNumberOfFilmsInFooter(films);
    searchField.addEventListener(`input`, function (evt) {
      doSearch(evt, films);
    });
  });
