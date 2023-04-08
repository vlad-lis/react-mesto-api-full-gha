const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');
const NotFoundError = require('../errors/NotFound');
const auth = require('../middlewares/auth');

router.use('/', authRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('page not found'));
});

module.exports = router;
