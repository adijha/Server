let router = require('express').Router()
let userController = require('../controllers/userController')

router.get('/', userController.sendOtp)


module.exports = router
