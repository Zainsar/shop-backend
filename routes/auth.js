const router = require('express').Router()
const authcontroller = require('../Controller/AuthController')

// Register
router.post('/register', authcontroller.Register)
router.post('/login', authcontroller.Login)

module.exports = router