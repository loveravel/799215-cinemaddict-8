/*
* Набор импортированный значений
* */

import * as tools from '../src/tools.js';
import {getRandomFromArray} from "../src/tools";
import moment from "moment";

/*
* Тело модуля
* */

const filmMakingData = {
  titles: [
    `Accused`,
    `Blackmail`,
    `Blue Blazes`,
    `Fuga Da New York`,
    `Moonrise`,
    `Three Friends`,
  ],
  genres: new Set([
    `thriller`,
    `horror`,
    `drama`,
    `melodrama`,
    `western`,
    `comedy`,
    `action`,
    `science`,
    `fiction`,
    `fantasy`,
    `musical`,
  ]),
  posters: new Set([
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`,
  ]),
  countries: [
    `USA`,
    `France`,
    `Turkey`,
    `Spain`,
    `China`,
    `Denmark`,
    `Germany`,
    `Japan`,
    `Russia`,
    `England`,
  ],
  names: {
    first: [
      `Isabella`,
      `Emma`,
      `Emily`,
      `Sophia`,
      `Olivia`,
      `Hannah`,
      `Jacob`,
      `Jason`,
      `Michael`,
      `Christopher`,
      `Ethan`,
      `Daniel`,
      `Matthew`,
    ],
    last: [
      `Smith`,
      `Johnson`,
      `Williams`,
      `Brown`,
      `Jones`,
      `Davis`,
      `Taylor`,
      `Wilson`,
      `Robinson`,
    ],
  },
  ageLimits: [
    `0+`,
    `6+`,
    `12+`,
    `16+`,
    `18+`,
  ],
  loremIpsum: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  emoji: [
    `😴`,
    `😐`,
    `😀`,
  ],
  get sentences() {
    return this.loremIpsum.split(`. `);
  },
  get description() {
    return tools.getRandomFromArray(this.sentences);
  },
  get person() {
    return tools.getRandomFromArray(this.names.first) + ` ` + tools.getRandomFromArray(this.names.last);
  },
  randomPersons(minimalAmount, maximumAmount) {
    const persons = [];
    for (let i = 0; i < tools.getRandomInteger(minimalAmount, maximumAmount); i++) {
      persons[i] = this.person;
    }
    return persons;
  },
  get country() {
    return tools.getRandomFromArray(this.countries);
  },
  get title() {
    return tools.getRandomFromArray(this.titles);
  },
  get genre() {
    const genres = Array.from(this.genres);
    return tools.getRandomFromArray(genres);
  },
  get poster() {
    const posters = Array.from(this.posters);
    return tools.getRandomFromArray(posters);
  },
  get comments() {
    const comments = [];
    for (let i = 0; i < tools.getRandomInteger(0, 10); i++) {
      const comment = {};
      comment.sentence = tools.getRandomFromArray(this.sentences);
      comment.person = this.person;
      comment.date = new Date().getFullYear();
      comment.emoji = getRandomFromArray(this.emoji);
      comments.push(comment);
    }
    return comments;
  },
  get date() {
    return moment().subtract(tools.getRandomInteger(0, 60), `year`);
  },
};

/*
* Набор экспортируемых значений
* */

/*
export const getFilmData = () => {
  return {
    title: filmMakingData.title,
    date: {
      date: filmMakingData.date,
      get yearOfIssue() {
        return moment(`${this.date}`).year();
      },
      get releaseDate() {
        return moment(`${this.date}`).format(`DD MMMM YYYY`);
      },
    },
    duration: tools.getRandomInteger(10, 240),
    rating: (Math.random() * 10).toFixed(2),
    userRating: 0,
    ageLimit: filmMakingData.ageLimits[tools.getRandomInteger(0, filmMakingData.ageLimits.length - 1)],
    comments: filmMakingData.comments,
    description: filmMakingData.description,
    poster: filmMakingData.poster,
    director: filmMakingData.person,
    writers: filmMakingData.randomPersons(1, 3),
    actors: filmMakingData.randomPersons(5, 10),
    country: filmMakingData.country,
    genre: filmMakingData.genre,
    list: {
      isWatchlist: false,
      isWatched: false,
      isFavorite: false,
    }
  };
};
*/

export const getFiltersData = (films) => {
  return [
    {
      name: `All movies`,
      link: `all`,
      active: true,
      count: 0,
    },
    {
      name: `Watchlist`,
      link: `watchlist`,
      active: false,
      count: films.length,
    },
    {
      name: `History`,
      link: `history`,
      active: false,
      count: films.length,
    },
    {
      name: `Favorites`,
      link: `favorites`,
      active: false,
      count: films.length,
    },
    {
      name: `Stats`,
      link: `stats`,
      active: false,
      count: 0,
    },
  ];
};
