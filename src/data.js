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
