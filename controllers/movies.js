const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies.reverse() }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const id = req.user._id;
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: id,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new BadRequestError('Переданы некорректные данные при создании фильма.');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === req.user._id) {
          Movie.deleteOne({ _id: movie._id }, { new: true })
            .then(() => {
              res.send({ data: movie });
            })
            .catch(next);
        } else {
          const err = new ForbiddenError('Фильм Вам не принадлежит.');
          next(err);
        }
      } else {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new BadRequestError('Фильм с указанным _id не найден.');
        next(e);
      } else {
        next(err);
      }
    });
};
