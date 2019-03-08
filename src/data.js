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

export const card = {
  title: [
    `Accused`,
    `Blackmail`,
    `Blue Blazes`,
    `Fuga Da New York`,
    `Moonrise`,
    `Three Friends`,
  ],
  rating: [
    (Math.random() * 10).toFixed(2),
    (Math.random() * 10).toFixed(2),
    (Math.random() * 10).toFixed(2),
    (Math.random() * 10).toFixed(2),
    (Math.random() * 10).toFixed(2),
    (Math.random() * 10).toFixed(2),
  ],
  date: new Date().getFullYear(),
  duration: [
    (Math.random() * 3).toFixed(2),
    (Math.random() * 3).toFixed(2),
    (Math.random() * 3).toFixed(2),
    (Math.random() * 3).toFixed(2),
    (Math.random() * 3).toFixed(2),
    (Math.random() * 3).toFixed(2),
  ],
  genre: new Set([
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
  poster: new Set([
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`,
  ]),
  description: SENTENCES_FOR_DESCRIPTION.split(`. `),
  comments: SENTENCES_FOR_DESCRIPTION.split(`. `),
};
