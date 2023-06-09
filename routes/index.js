const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const pageNotFoundRouter = require('./pageNotFound');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/', pageNotFoundRouter);

module.exports = router;
