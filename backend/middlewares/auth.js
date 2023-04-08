const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new AuthError('Unauthorized');
    }

    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new AuthError('Unauthorized'));
  }

  req.user = payload;
  return next();
};
