const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new AuthError('Unauthorized');
    }

    payload = jwt.verify(token, 'very-secret-key');
  } catch (err) {
    next(new AuthError('Unauthorized'));
  }

  req.user = payload;
  next();
};
