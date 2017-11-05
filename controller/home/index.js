
class Home {
    constructor() {

    }

    render(req, res, next) {
        res.render('index', {
            title: 'hello',
            username: 'test1',
            sign: 'sing2',
            themeColor: 'light-blue'
        }) 
    }
}

module.exports =  new Home() 