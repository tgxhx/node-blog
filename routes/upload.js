var express = require('express')
var router = express.Router()
var upload = require('../controller/upload')

var multer = require('multer')

var storage = multer.diskStorage({
  destination(req, res, cb) {
    cb(null, 'public/uploads')
  },
  filename(req, file, cb) {
    var extname = file.originalname.split('.').pop()
    cb(null, `${file.fieldname}_${Date.now()}.${extname}`)
  }
})

var uploadmulter = multer({storage})


router.post('/', uploadmulter.single('image'), upload.uploadFile)

module.exports = router