let router = require('express').Router()
let userController = require('../controllers/userController')

router.post('/gen', userController.sendOtp)

router.post('/verify', userController.verify)

// router.post('/verify', )
//
// router.post('/profile', )
//
// router.get('/profile')

router.get('/userbyPhone', userController.user)

module.exports = router
