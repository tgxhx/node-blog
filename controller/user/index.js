class User {
    constructor() {

    }

    render(req, res, next) {
        res.render('login', {
            title: 'login',
            username: 'test1',
            sign: 'sing2',
            themeColor: 'teal'
        }) 
    }
}

module.exports =  new User() 