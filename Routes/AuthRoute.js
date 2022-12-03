const router = require('express').Router();
const {register ,login } = require('../Controllers/AuthController')

router.post('/register', register)
router.post('/login', login)

module.exports = router;