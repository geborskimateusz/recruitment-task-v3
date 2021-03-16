const database = require('../db/database');

class Model {

    constructor(schema) {
        this.schema = schema;

        const db = database(this.schema);
        this.find = (params) => db.find(params);
        this.findAny = () => db.findAny();

    }
}

module.exports = { Model } 