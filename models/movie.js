const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const LINK = /https?:\/\/(www\.)?[\w+\-./:?#[\]$&'()*+@,;=~!]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w+\-./:?#[\]$&'()*+@,;=~!]+)/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK.test(v);
      },
      message: (props) => `${props.value} не является корректной ссылкой!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK.test(v);
      },
      message: (props) => `${props.value} не является корректной ссылкой!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK.test(v);
      },
      message: (props) => `${props.value} не является корректной ссылкой!`,
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('movie', movieSchema);
