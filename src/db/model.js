const database = require('../db/database');

class Model {

    constructor(schema) {
        this.schema = schema;
        this.db = database(this.schema);
        this.find = (params) => this.db.find(params);
        this.findAny = () => this.db.findAny();

    }
}

module.exports = { Model } 