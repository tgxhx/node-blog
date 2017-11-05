var express = require('express');
var router = express.Router();
const user = require('../controller/user')

router.get('/', user.render) 

module.exports = router;  
