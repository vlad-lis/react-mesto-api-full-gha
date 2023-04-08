const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const { urlRegex } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().allow('').pattern(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signout', logout);

router.use(errors());

module.exports = router;
