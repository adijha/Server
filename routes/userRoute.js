let router = require('express').Router()
let userController = require('../controllers/userController')

router.post('/', userController.sendOtp)

router.post('/resend', userController.resendOtp)

router.post('/verify', )

router.post('/profile', )

router.get('/profile')

module.exports = router
