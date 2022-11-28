const router = require('express').Router();
const register = require('../Controllers/AuthController')

router.post('/register', register)

module.exports = router;