export default class ModelFilm {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments || [];

    this.isWatched = data.user_details.already_watched;
    this.isFavorite = data.user_details.favorite;
    this.isWatchlist = data.user_details.watchlist;
    this.userRating = data.user_details.personal_rating || 0;
    this.watchingDate = data.user_details.watching_date;

    this.actors = data.film_info.actors || [];
    this.ageLimit = data.film_info.age_rating || 0;
    this.altTitle = data.film_info.alternative_title || ``;
    this.description = data.film_info.description || ``;
    this.director = data.film_info.director || ``;

    this.genre = data.film_info.genre || [];
    this.poster = data.film_info.poster;

    this.date = new Date(data.film_info.release.date);
    this.country = data.film_info.release.release_country || ``;
    this.duration = data.film_info.runtime || 0;
    this.rating = data.film_info.total_rating || 0;
    this.title = data.film_info.title || 0;

    this.writers = data.film_info.writers || [];
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'actors': this.actors,
        'age_rating': this.ageLimit,
        'alternative_title': this.altTitle,
        'description': this.description,
        'director': this.director,
        'genre': this.genre,
        'poster': this.poster,
        'release': {
          'date': this.date,
          'release_country': this.country
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': this.rating,
        'writers': this.writers
      },
      'user_details': {
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'personal_rating': this.userRating,
        'watchlist': this.isWatchlist
      }
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}
