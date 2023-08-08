require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const config = require('./config');
const router = require('./routes/index');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_ERROR } = require('./utils/constants');

const app = express();

mongoose.connect(config.DB_HOST, {
  useNewUrlParser: true,
});

app.use(limiter);

app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.use(cors);
app.use(router);

app.use(errorLogger);
app.use(errors());

app.use((err, _req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR
        : message,
    });

  return next();
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});

module.exports = app;
