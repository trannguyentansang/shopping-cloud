var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller')
const upload = require("../controllers/upload")

router.get('/', userController.index)
router.get('/adding', userController.adding)
router.post('/adding', upload.single("avatar"), userController.postAdding)
router.get('/editing', userController.editing)
router.post('/editing', upload.single("avatar"), userController.postEditing)
router.get('/deactivate', userController.deactivate)
router.get('/activate', userController.activate)

module.exports = router;