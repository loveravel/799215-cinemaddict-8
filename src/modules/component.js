/*
* Набор импортированный значений
* */

import * as tools from '../tools.js';

/*
* Набор экспортируемых значений
* */

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;

    this._state = {
      isWatchlist: false,
      isWatched: false,
      isFavorite: false,
    };
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = tools.createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  update() {}
}
