const LINK = /https?:\/\/(www\.)?[\w+\-./:?#[\]$&'()*+@,;=~!]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w+\-./:?#[\]$&'()*+@,;=~!]+)/;

const NOT_FOUND_USER = 'Пользователь по указанному _id не найден.';
const UPDATE_PROFILE_WRONG_DATA = 'Переданы некорректные данные при обновлении профиля.';
const CREATE_USER_WRONG_DATA = 'Переданы некорректные данные при создании пользователя.';
const DUPLICATE_USER_DATA = 'Переданы некорректные данные при создании пользователя.';

const MOT_FOUND_MOVIE = 'Фильм с указанным _id не найден.';
const MOVIE_WRONG_DATA = 'Переданы некорректные данные при создании фильма.';
const MOVIE_FORBID_ACCESS = 'Фильм Вам не принадлежит.';

const NOT_FOUND = 'Страница не найдена.';
const SERVER_ERROR = 'На сервере произошла ошибка';
const CRASH_TEST_ERROR = 'Сервер сейчас упадёт';

const NOT_AUTH = 'Необходима авторизация.';

module.exports = {
  LINK,
  NOT_FOUND_USER,
  UPDATE_PROFILE_WRONG_DATA,
  CREATE_USER_WRONG_DATA,
  DUPLICATE_USER_DATA,
  MOVIE_WRONG_DATA,
  MOT_FOUND_MOVIE,
  MOVIE_FORBID_ACCESS,
  NOT_FOUND,
  SERVER_ERROR,
  CRASH_TEST_ERROR,
  NOT_AUTH,
};
