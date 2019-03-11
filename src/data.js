/*
* Набор импортированный значений
* */

import * as tools from '../src/tools.js';
import {getRandomFromArray, getRandomInteger} from "../src/tools";

/*
* Список констант
* */

const SENTENCES_FOR_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const AGE_LIMITS = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`,
];

/*
* Набор экспортируемых значений
* */

export const createCardData = () => {
  return {
    titles: [
      `Accused`,
      `Blackmail`,
      `Blue Blazes`,
      `Fuga Da New York`,
      `Moonrise`,
      `Three Friends`,
    ],
    yearOfIssue: new Date().getFullYear() - tools.getRandomInteger(0, 60),
    cast: [],
    duration: tools.getRandomInteger(10, 240),
    rating: (Math.random() * 10).toFixed(2),
    userRating: (Math.random() * 10).toFixed(2),
    ageLimit: AGE_LIMITS[getRandomInteger(0, AGE_LIMITS.length - 1)],
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
    descriptions: SENTENCES_FOR_DESCRIPTION.split(`. `),
    comments: SENTENCES_FOR_DESCRIPTION.split(`. `),
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
    get country() {
      return getRandomFromArray(this.countries);
    },
    get title() {
      return getRandomFromArray(this.titles);
    },
    get genre() {
      const genres = Array.from(this.genres);
      return getRandomFromArray(genres);
    },
    get poster() {
      const posters = Array.from(this.posters);
      return getRandomFromArray(posters);
    },
    get description() {
      return getRandomFromArray(this.descriptions);
    },
    get comment() {
      return getRandomFromArray(this.comments);
    },
  };
};
