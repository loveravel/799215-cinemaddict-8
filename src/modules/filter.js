/*
* Набор импортированный значений
* */

import Component from "./component";

/*
* Набор экспортируемых значений
* */

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._link = data.link;
    this._count = data.count;
    this._active = data.active;

    this._onClick = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get name() {
    return this._name;
  }

  get template() {
    return `
      <a href="#${this._link}" class="main-navigation__item 
        ${this._active ? `main-navigation__item--active` : ``}">
        ${this._name}
        ${this._count ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
      </a>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}
