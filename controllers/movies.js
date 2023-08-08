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
        const e = new BadRequestError('Переданы некорректные данные при создании карточки.');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === req.user._id) {
          Movie.deleteOne({ _id: movie._id }, { new: true })
            .then(() => {
              res.send({ data: movie });
            })
            .catch(next);
        } else {
          const err = new ForbiddenError('Карточка Вам не принадлежит.');
          next(err);
        }
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new BadRequestError('Карточка с указанным _id не найдена.');
        next(e);
      } else {
        next(err);
      }
    });
};
