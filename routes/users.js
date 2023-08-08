const router = require('express').Router();
const {
  getUser, updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserInfo);

module.exports = router;
