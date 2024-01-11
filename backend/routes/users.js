const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers, getUserById, updateUserInfo, updateAvatar, getMe,
} = require('../controllers/users');
const { updateUserScheme, updateAvatarScheme } = require('../joiSchemes');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUserById);
router.patch('/me', celebrate(updateUserScheme), updateUserInfo);
router.patch('/me/avatar', celebrate(updateAvatarScheme), updateAvatar);

module.exports = router;
