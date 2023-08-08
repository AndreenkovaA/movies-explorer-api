const params = require('params');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const DuplicateError = require('../errors/duplicate-err');
const {
  NOT_FOUND_USER, UPDATE_PROFILE_WRONG_DATA, CREATE_USER_WRONG_DATA,
  DUPLICATE_USER_DATA,
} = require('../utils/constants');

const userParams = ['name'];

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError(NOT_FOUND_USER);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new BadRequestError(NOT_FOUND_USER);
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    params(req.body).only(userParams),
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError(NOT_FOUND_USER);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        const e = new BadRequestError(UPDATE_PROFILE_WRONG_DATA);
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name, email, id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new BadRequestError(CREATE_USER_WRONG_DATA);
        next(e);
      } else if (err.code === 11000) {
        const e = new DuplicateError(DUPLICATE_USER_DATA);
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: config.JWT_TTL });
      res.send({ token });
    })
    .catch(next);
};
