const database = require('../db/database');

class Model {

    constructor(schema) {
        if (Model._instance) {
            return Model._instance
        }
        Model._instance = this;

        this.schema = schema;
        this.findAll = (params) => database(this.schema).findAll(params)
    }
}

module.exports = { Model };