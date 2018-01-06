var pool = require('../../mysql')
var utils = require('../utils')
var momont = require('moment')
var base64 = require('base-64')
var uuidv1 = require('uuid/v1')

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
            res.send({
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
            res.send({
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
    var access_token
    pool.getConnection((err, connection) => {
      if (err) throw err
      utils.query(`select * from users where username='${data.username}';`, connection)
        .then(rows => {
          try {
            if (!rows.length) {
              let message = 'username does not exist'
              res.send({
                code: 3004,
                message
              })
            } else {
              let password = rows[0].password
              if (password !== data.password) {
                let message = 'password is incorrect'
                res.send({
                  code: 3005,
                  message
                })
              } else {
                access_token = uuidv1()
                let time = Date.now()
                return utils.query('UPDATE users SET token = ?, last_login = ? WHERE username = ?', connection, [access_token, time, data.username])
              }
            }
          } catch (error) {
            return Promise.reject(error)
          }
        })
        .then(rows => {
          if (rows) {
            res.send({
              code: 0,
              message: 'login success',
              username: data.username,
              token: access_token
            })
          }
        })
        .catch(next)
    })
  }
  
  isLogin(req, res, next) {
    let token = req.query.token
    pool.getConnection((err, connection) => {
      if (err) throw err
      utils.query(`SELECT * FROM users where token='${token}'`, connection)
        .then(rows => {
          if (rows.length) {
            var lastLogin = rows[0].last_login
            var now = Date.now()
            if (now - lastLogin > 1000 * 60 * 10) {
              return res.send({
                code: 3006,
                message: 'is time out'
              })
            } else {
              return res.send({
                code: 0,
                message: 'is login'
              })
            }
          } else {
            return res.send({
              code: 3007,
              message: 'is not login'
            })
          }
        })
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
            return res.send({
              code: 3001,
              message
            })
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
            res.send({
              code: 0,
              message: 'create post success'
            })
          }
        })
        .catch(next)
    })
  }
  
  postEdit(req, res, next) {
    let data = req.body,
      str = '',
      updateArr = []
    
    for (let i in data) {
      if (data[i] && i !== 'id') {
        str += `${i} = ?, `
        updateArr.push(data[i])
      }
    }
    str = str.slice(0, str.length - 2)
    updateArr.push(+data.id)
    let sql = `UPDATE posts SET ${str} WHERE id = ?`
    pool.getConnection((err, connection) => {
      if (err) throw err
      utils.query(sql, connection, updateArr)
        .then(rows => {
          if (rows) {
            res.send({
              code: 0,
              message: 'update post success'
            })
          }
        })
        .catch(next)
    })
  }
}

module.exports = new Api() 