
class Edit {
    constructor() {

    }

    render(req, res, next) {
        res.render('edit', {
            title: 'edit',
            username: 'test1',
            sign: 'sing2',
            themeColor: 'light-blue'
        })
    }
}

module.exports =  new Edit()