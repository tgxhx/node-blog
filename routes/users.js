var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id/:name', function(req, res, next) {
  console.log(req.params.id)
  console.log(req.params.name)
  res.json(req)
});

module.exports = router; 
