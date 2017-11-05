var express = require('express')
var router = express.Router()
// import Edit from '../controller/home'
const Home = require('../controller/home')

router.get('/', Home.render)

module.exports = router