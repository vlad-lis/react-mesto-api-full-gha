const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
// const BadRequestError = require('../errors/BadRequest');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => validator.isURL(avatar),
      message: 'not an url',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => { validator.isEmail(email); },
      message: 'incorrect email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // if (!email || !password) {
  //   throw new BadRequestError('incorrect credentials');
  // }

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Unauthorized');
      }

      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new AuthError('Unauthorized');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
