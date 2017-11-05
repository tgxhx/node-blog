class User {
    constructor() {

    }

    render(req, res, next) {
        res.render('login', {
            title: 'login'
        }) 
    }
}

module.exports =  new User() 