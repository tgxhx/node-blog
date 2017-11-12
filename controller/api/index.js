var pool = require('../../mysql')
var utils = require('../utils')
var momont = require('moment')

class Api {
    constructor() {

    }

    register(req, res, next) {
        var data = req.body
        pool.getConnection((err, connection) => {
            if (err) throw err
            utils.query(`select * from users where username='${data.username}';`, connection)
                .then(rows => {
                    if (rows.length) {
                        res.json({
                            code: 3001,
                            message: 'username is exists'
                        })
                        return Promise.reject('username is exists')
                    } else {
                        return utils.query('SELECT * FROM `users` where id=(SELECT MAX(id) FROM users);', connection)
                    }
                })
                .then(rows => {
                    var maxID = rows[0].id
                    var data = {
                        id: ++maxID,
                        ...req.body
                    }
                    return utils.query('INSERT INTO users SET ?', connection, data)
                })
                .then(rows => {
                    if (rows) {
                        res.json({
                            code: 0,
                            message: 'ok'
                        })
                    }
                })
                .catch(next)
        })
    }

    login(req, res, next) {
        var data = req.body
        pool.getConnection((err, connection) => {
            if (err) throw err
            utils.query(`select * from users where username='${data.username}';`, connection)
                .then(rows => {
                    if (!rows.length) {
                        let message = 'username does not exist'
                        res.json({
                            code: 3004,
                            message 
                        })
                        return Promise.reject(message)
                    } else {
                        var password = rows[0].password
                        if (password !== data.password) {
                            let message = 'password is incorrect'
                            res.json({
                                code: 3005,
                                message
                            })
                            return Promise.reject(message)
                        } else {
                            res.cookie('username', data.username, {
                                expires: new Date(Date.now() + 60 * 60 * 1000),
                            })
                            res.json({
                                code: 0,
                                message: 'login success',
                                username: data.username
                            })
                        }
                    }
                })
                .catch(next)
        })
    }

    postCreate(req, res, next) {
        let data = req.body
        let maxID
        pool.getConnection((err, connection) => {
            if (err) throw err
            utils.query(`SELECT * FROM posts where title='${data.title}';`, connection)
                .then(rows => {
                    if (rows.length) {
                        let message = 'post is exists'
                        res.json({
                            code: 3001,
                            message
                        })
                        return Promise.reject(message)
                    } else {
                        return utils.query('SELECT * FROM posts where id=(SELECT MAX(id) FROM posts);', connection)
                    }
                })
                .then(rows => {
                    maxID = rows[0].id

                    let saveData = {
                        id: ++maxID,
                        ...data
                    }
                    return utils.query('INSERT INTO posts SET ?', connection, saveData)
                })
                .then(rows => {
                    if (rows) {
                        res.json({
                            code: 0,
                            message: 'create post success'
                        })
                    }
                })
                .catch(next)
        })
    }
}

module.exports = new Api() 