const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const {
  getAllUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');
const { urlRegex } = require('../utils/constants');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().allow('').pattern(urlRegex),
  }),
}), updateUserAvatar);

router.use(errors());

module.exports = router;
