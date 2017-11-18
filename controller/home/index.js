var pool = require('../../mysql')
var utils = require('../utils')
var randomColor = require('../../middlewares/randowColor')

class Home {
    constructor() {
        
    }

    render(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            utils.query('select * from posts;', connection)
                .then(rows => {
                    if (!rows.length) {
                        Promise.reject(rows)
                        return
                    }
                    res.render('index', {
                        title: 'hello',
                        username: 'test1',
                        sign: 'sing2',
                        themeColor: randomColor(),
                        posts: rows
                    }) 
                })
                .catch(next)
        })
    }
}

module.exports =  new Home() 