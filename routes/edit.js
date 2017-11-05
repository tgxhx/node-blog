var express = require('express');
var router = express.Router();
var edit = require('../controller/edit')

router.get('/', edit.render)

module.exports = router;