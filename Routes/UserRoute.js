const router = require('express').Router();
const {getUser,updateUser,deleteUser } = require('../Controllers/UserController');

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
