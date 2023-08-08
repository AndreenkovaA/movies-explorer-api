const router = require('express').Router();
const {
  getUser, updateUserInfo,
} = require('../controllers/users');
const { validationUserUpdate } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', validationUserUpdate, updateUserInfo);

module.exports = router;
