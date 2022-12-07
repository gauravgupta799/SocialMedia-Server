const router = require('express').Router();
const {getUser,updateUser,deleteUser,followUser,UnfollowUser, getAllUsers } = require('../Controllers/UserController');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',UnfollowUser)

module.exports = router;
