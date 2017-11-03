var express = require('express');
var router = express.Router();
var user = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.a)
  
  user().then(res2 => {
    res.render('index', { title: res2.body.title });
  })
});

module.exports = router;
