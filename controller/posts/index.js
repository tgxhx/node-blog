var pool = require('../../mysql')
var utils = require('../utils')

class Post {
    constructor() {

    }

    render(req, res, next) {
        let id = req.params.id
        pool.getConnection((err, connection) => {
            utils.query(`SELECT * from posts where id=${id}`, connection)
                .then(rows => {
                    if (rows.length) {
                        let obj = rows[0]
                        res.render('post', {
                            title: obj.title,
                            username: obj.author,
                            create_time: obj.create_time,
                            html: obj.html,
                            sign: 'sing2',
                            themeColor: 'teal'
                        }) 
                    }   
                })
        })
    }
} 

module.exports =  new Post()  