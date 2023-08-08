const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().max(4),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailerLink: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createMovie);
router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
