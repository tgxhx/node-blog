var request = require('request')
var fs = require('fs')
var path = require('path')
var host = require('../../config').host

class Upload {
  constructor() {
  
  }
  
  uploadFile(req, res, next) {
    request.post({
      url: `http://${host}:8888/upload`,
      formData: {image: fs.createReadStream(path.join(__dirname, '../../public/uploads/' + req.file.filename)),}
    }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      try {
        body = JSON.parse(body)
        console.log('Upload successful!  Server responded with:', body);
        
        res.send({
          code: 0,
          message: 'upload successed!',
          path: body.path
        })
      } catch (error) {
        console.error(error)
      }
    });
  }
}

module.exports = new Upload()