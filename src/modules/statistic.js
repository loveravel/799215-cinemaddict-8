import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as tools from '../tools.js';

const statisticTextList = document.querySelector(`.statistic__text-list`);

const getTemplateStatistic = (filmsData, mostPopularGenre) => {
  let totalDuration = 0;
  if (filmsData.length) {
    totalDuration = filmsData.reduce((a, b) => {
      return (parseFloat(a) || 0) + (parseFloat(b.duration) || 0);
    }, 0);
    totalDuration = tools.getTimeFromMinutes(totalDuration);
  }

  return ` 
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${filmsData.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${totalDuration.hours ? totalDuration.hours : `0`} 
        <span class="statistic__item-description">h</span> ${totalDuration.minutes ? totalDuration.minutes : `0`} 
        <span class="statistic__item-description">m</span>
      </p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${mostPopularGenre ? mostPopularGenre : `No movies viewed`}</p>
    </li>
  `;
};

const drawChart = (genres) => {
  const statisticCtx = document.querySelector(`.statistic__chart`);
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * Object.values(genres).length;
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genres),
      datasets: [{
        data: Object.values(genres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default (films) => {
  statisticTextList.innerHTML = ``;
  const watchedFilms = films.filter((it) => it.isWatched);

  let totalGenres = [];
  if (watchedFilms.length) {
    totalGenres = watchedFilms.reduce((a, b) => {
      return a.concat(b.genre);
    }, []);
  }

  const resultGenres = totalGenres.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  let arrayValues = Object.values(resultGenres);
  let mostPopularGenre = Object.keys(resultGenres)[arrayValues.indexOf(Math.max(...arrayValues))];

  statisticTextList.innerHTML = getTemplateStatistic(watchedFilms, mostPopularGenre);
  drawChart(resultGenres);
};
