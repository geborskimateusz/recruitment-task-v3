const database = require('../db/database');

class Model {

    constructor(schema) {
        this.schema = schema;
        this.findAll = (params) => database(this.schema).findAll(params)
    }
}

module.exports = { Model } 