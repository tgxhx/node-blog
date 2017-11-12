var express = require('express');
var router = express.Router();
var post = require('./../controller/posts')

router.get('/:id', post.render)

module.exports = router;