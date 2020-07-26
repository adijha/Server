let router = require('express').Router()
let userController = require('../controllers/userController')

router.post('/otp', userController.sendOtp)

router.post('/verify', userController.verify)

router.post('/profile', userController.profile)

router.get('/userbyPhone', userController.user)

module.exports = router
