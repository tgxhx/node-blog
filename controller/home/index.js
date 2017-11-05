
class Home {
    constructor() {

    }

    render(req, res, next) {
        res.render('index', {
            title: 'hello'
        }) 
    }
}

module.exports =  new Home() 