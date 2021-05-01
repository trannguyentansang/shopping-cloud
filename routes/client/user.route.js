var express = require('express');
var router = express.Router();
var userController = require('../../controllers/client/user.controller')
var middleware = require('../../middlewares/auth.middleware')

router.get('/profile',middleware.requireAuth, userController.profile)
router.post('/profile',middleware.requireAuth, userController.postProfile)

module.exports = router;