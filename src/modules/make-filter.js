export default (filterLink, filterName, amount, active = false, additional = false) => {
  return `<a href="#${filterLink}"
class="main-navigation__item
${active ? `main-navigation__item--active` : ``}
${additional ? `main-navigation__item--additional` : ``}
">
${filterName} 
${amount === 0 ? `` : `<span class="main-navigation__item-count">${amount}</span>`}
</a>`;
};
