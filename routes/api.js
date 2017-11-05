var express = require('express');
var router = express.Router();
const api = require('../controller/api')

//注册接口
router.post('/register', api.register) 

//登录接口
router.post('/login', api.login)

//文章上传接口
router.post('/posts/create', api.postCreate)

module.exports = router;    