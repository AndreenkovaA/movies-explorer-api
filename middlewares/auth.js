const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/unautorized-err');
const config = require('../config');
const { NOT_AUTH } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError(NOT_AUTH);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new UnautorizedError(NOT_AUTH);
  }

  req.user = payload;

  next();
};
