var pool = require('../../mysql')
var utils = require('../utils')
var moment = require('moment')
var randomColor = require('../../middlewares/randowColor')

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
                            create_time: moment(+obj.create_time).format('YYYY-MM-DD'),
                            html: obj.html,
                            sign: 'sing2',
                            themeColor: randomColor()
                        }) 
                    } else {
                        Promise.reject(rows)
                    }  
                }) 
                .catch(next)
        })
    }
} 

module.exports =  new Post()  