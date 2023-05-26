const router = require('express').Router();
const usersControllers = require('../controllers/users');

router.get('/', usersControllers.getUsers);

router.get('/:userId', usersControllers.getUserById);

router.post('/', usersControllers.createUser);

router.patch('/me', usersControllers.updateProfile);

router.patch('/me/avatar', usersControllers.updateAvatar);

module.exports = router;
