const router = require('express').Router();
const usersControllers = require('../controllers/users');
const { validateUserId, validateUserProfile, validateUserAvatar } = require('../middlewares/validate');

router.get('/', usersControllers.getUsers);

router.get('/me', usersControllers.getCurrentUser);

router.get('/:userId', validateUserId, usersControllers.getUserById);

router.patch('/me', validateUserProfile, usersControllers.updateProfile);

router.patch('/me/avatar', validateUserAvatar, usersControllers.updateAvatar);

module.exports = router;
