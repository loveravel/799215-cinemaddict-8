export default (filterLink, filterName, amount = false, active = false) => {
  return `<a href="#${filterLink}"
class="main-navigation__item
${active ? `main-navigation__item--active` : ``}
">
${filterName} 
${amount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}
</a>`;
};
