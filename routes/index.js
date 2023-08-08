const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { validationSignIn, validationSignUp } = require('../middlewares/validation');
const { NOT_FOUND, CRASH_TEST_ERROR } = require('../utils/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_TEST_ERROR);
  }, 0);
});

router.post('/signin', validationSignIn, login);
router.post('/signup', validationSignUp, createUser);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);

router.use(() => { throw new NotFoundError(NOT_FOUND); });

module.exports = router;
