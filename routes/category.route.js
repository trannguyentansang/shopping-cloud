var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category.controller')
const upload = require("../controllers/upload")
var middleware = require('../middlewares/auth.middleware')

router.get('/',middleware.requireAuth, categoryController.index)
router.get('/adding',middleware.requireAuth, categoryController.adding)
router.post('/adding',middleware.requireAuth, upload.single("catFile"), categoryController.postAdding)
router.get('/editing',middleware.requireAuth, categoryController.editing)
router.post('/editing',middleware.requireAuth, upload.single("catFile"), categoryController.postEditing)
router.get('/deleting',middleware.requireAuth, categoryController.deleting)

module.exports = router;