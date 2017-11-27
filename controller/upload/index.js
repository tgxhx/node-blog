class Upload {
    constructor() {

    }

    uploadFile(req, res, next) {
        try {
            var path = '/uploads/' + req.file.filename
        } catch (error) {
            console.log(error)
        }
        
        res.send({
            code: 0,
            message: 'upload successed!',
            path
        })
    }
}

module.exports = new Upload()