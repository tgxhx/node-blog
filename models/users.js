var superagent = require('superagent')

module.exports = () => {
    return new Promise((resolve, reject) => {
        superagent
        .get('http://easy-mock.com/mock/59e6f3d434be4b482ca2320e/api/#!method=get')
        .end((err, res) => {
            resolve(res)    
        })
    })
}