require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DATABASE = 'mongodb://127.0.0.1:27017/bitfilmsdb', PORT = 3000 } = process.env;

const app = express();

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

const allowedCors = [
  'https://diplom.front.nomoreparties.co',
  'http://diplom.front.nomoreparties.co',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(auth);
app.use(userRouter);
app.use(movieRouter);

app.use(errorLogger);

app.use(() => { throw new NotFoundError('Страница не найдена.'); });

app.use(errors());

app.use((err, _req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
