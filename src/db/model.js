const { database } = require('../db/database');

// Model defines a base programming interface for interacting with the database.
class Model {

    constructor(schema) {
        this.schema = schema;
        this.db = database(this.schema);
        this.find = async (params) => await this.db.find(params);
        this.findAny = async () => await this.db.findAny();
    }
}

module.exports = { Model }; 