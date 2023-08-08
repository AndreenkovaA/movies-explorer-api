const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validationMovie, validationMovieId } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validationMovie, createMovie);
router.delete('/movies/:_id', validationMovieId, deleteMovie);

module.exports = router;
