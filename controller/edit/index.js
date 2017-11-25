var util = require('../utils')
var pool = require('../../mysql')

class Edit {
    constructor() {

    }

    render(req, res, next) {
        var postId = req.params.id,
            renderObj = {
                title: 'edit',
                username: 'test1',
                sign: 'sing2',
                themeColor: 'light-blue',
            }
        if (postId) {
            pool.getConnection((err, connection) => {
                if (err) throw err
                util.query(`select * from posts where id='${postId}'`, connection)
                    .then(rows => {
                        if (!rows.length) return Promise.reject('post is not exists')
                        res.render('edit', {
                            ...renderObj,
                            data: rows[0]
                        })
                    })
                    .catch(next)
            })
        } else {
            res.render('edit', renderObj)
        }
    }
}

module.exports =  new Edit()