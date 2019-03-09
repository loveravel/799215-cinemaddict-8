/*
* Набор импортированный значений
* */

import * as tools from '../src/tools.js';

/*
* Список констант
* */

const SENTENCES_FOR_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

/*
* Тело модуля
* */

export const cardData = () => {
  return {
    titles: [
      `Accused`,
      `Blackmail`,
      `Blue Blazes`,
      `Fuga Da New York`,
      `Moonrise`,
      `Three Friends`,
    ],
    rating: (Math.random() * 10).toFixed(2),
    date: new Date().getFullYear() - tools.getRandomInteger(0, 60),
    duration: (Math.random() * 3).toFixed(2),
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
    get title() {
      return this.titles[tools.getRandomInteger(0, this.titles.length - 1)];
    },
    get genre() {
      const genres = Array.from(this.genres);
      return genres[tools.getRandomInteger(0, genres.length - 1)];
    },
    get poster() {
      const posters = Array.from(this.posters);
      return posters[tools.getRandomInteger(0, posters.length - 1)];
    },
    get description() {
      return this.descriptions[tools.getRandomInteger(0, this.descriptions.length - 1)];
    },
    get comment() {
      return this.comments[tools.getRandomInteger(0, this.comments.length - 1)];
    },
  };
};
