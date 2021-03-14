const findAll = require('./findAll.js')
const create = require('./create.js')


module.exports = {
    findAllRouter: findAll.router,
    createRouter: create.router
}