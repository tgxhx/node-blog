'user strict'

// import home from './home'
const home = require('./home')
const users = require('./users')
const api = require('./api')
const edit = require('./edit')
const posts = require('./posts')
const upload = require('./upload')

module.exports = app => {
    /* app.use('/', (req, res, next) => {
      res.redirect('/home')
    }) */ 
    app.use('/', home)
    app.use('/api', api)
    app.use('/login', users)
    app.use('/edit', edit)
    app.use('/post', posts)
    app.use('/upload', upload)
}