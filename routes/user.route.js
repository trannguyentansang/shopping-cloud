var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller')
const upload = require("../controllers/upload")
var middleware = require('../middlewares/auth.middleware')

router.get('/',middleware.requireAuth, userController.index)
router.get('/adding',middleware.requireAuth, userController.adding)
router.post('/adding',middleware.requireAuth, upload.single("avatar"), userController.postAdding)
router.get('/editing',middleware.requireAuth, userController.editing)
router.post('/editing',middleware.requireAuth, upload.single("avatar"), userController.postEditing)
router.get('/deactivate',middleware.requireAuth, userController.deactivate)
router.get('/activate',middleware.requireAuth, userController.activate)

module.exports = router;