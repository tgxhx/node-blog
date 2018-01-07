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
    pool.getConnection(async (err, connection) => {
      if (err) throw err
      try {
        const rows = await utils.query(`select * from users where username='${data.username}';`, connection)
        if (rows.length) {
          return res.send({
            code: 3001,
            message: 'username is exists'
          })
        }
        
        const rows1 = await utils.query('SELECT * FROM `users` where id=(SELECT MAX(id) FROM users);', connection)
        var maxID = rows1[0].id
        var dataInsert = {
          id: ++maxID,
          ...req.body
        }
        
        const rows2 = await utils.query('INSERT INTO users SET ?', connection, dataInsert)
        if (rows) {
          return res.send({
            code: 0,
            message: 'ok'
          })
        }
        
        return res.send({
          code: 3008,
          message: 'something is wrong'
        })
      } catch (e) {
        throw (e)
        next(e)
      }
    })
  }
  
  login(req, res, next) {
    var data = req.body
    var access_token
    pool.getConnection(async (err, connection) => {
      if (err) throw err
      try {
        const rows = await utils.query(`select * from users where username='${data.username}';`, connection)
        if (!rows.length) {
          let message = 'username does not exist'
          return res.send({
            code: 3004,
            message
          })
        }
        
        let password = rows[0].password
        if (password !== data.password) {
          let message = 'password is incorrect'
          return res.send({
            code: 3005,
            message
          })
        }
        
        access_token = uuidv1()
        let time = Date.now()
        const rowsUpdate = await utils.query('UPDATE users SET token = ?, last_login = ? WHERE username = ?', connection, [access_token, time, data.username])
        if (rowsUpdate) {
          return res.send({
            code: 0,
            message: 'login success',
            username: data.username,
            token: access_token
          })
        }
        
        return res.send({
          code: 3008,
          message: 'something is wrong'
        })
      } catch (e) {
        throw e
        next(e)
      }
    })
  }
  
  isLogin(req, res, next) {
    let token = req.query.token
    pool.getConnection(async (err, connection) => {
      if (err) throw err
      try {
        const rows = await utils.query(`SELECT * FROM users where token='${token}'`, connection)
        if (!rows.length) {
          return res.send({
            code: 3007,
            message: 'is not login'
          })
        }
        
        var lastLogin = rows[0].last_login
        var now = Date.now()
        if (now - lastLogin > 1000 * 60 * 10) {
          return res.send({
            code: 3006,
            message: 'is time out'
          })
        }
        
        return res.send({
          code: 0,
          message: 'is login'
        })
      } catch (e) {
        throw e
        next(e)
      }
    })
  }
  
  postCreate(req, res, next) {
    let data = req.body
    let maxID
    pool.getConnection(async (err, connection) => {
      if (err) throw err
      try {
        const rows = await utils.query(`SELECT * FROM posts where title='${data.title}';`, connection)
        if (rows.length) {
          let message = 'post is exists'
          return res.send({
            code: 3001,
            message
          })
        }
        
        const rows1 = await utils.query('SELECT * FROM posts where id=(SELECT MAX(id) FROM posts);', connection)
        maxID = rows1[0].id
        
        let saveData = {
          id: ++maxID,
          ...data
        }
        
        const rows2 = await utils.query('INSERT INTO posts SET ?', connection, saveData)
        if (rows2) {
          return res.send({
            code: 0,
            message: 'create post success'
          })
        }
      } catch (e) {
        throw e
        next(e)
      }
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
    pool.getConnection(async (err, connection) => {
      if (err) throw err
      try {
        const rows = await utils.query(sql, connection, updateArr)
        if (rows) {
          return res.send({
            code: 0,
            message: 'update post success'
          })
        }
        
        return res.send({
          code: 3009,
          message: 'something is wrong'
        })
      } catch (e) {
        throw e
        next(e)
      }
    })
  }
}

module.exports = new Api() 