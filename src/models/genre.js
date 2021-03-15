const { Model } = require('./model')

class Genre extends Model {
    constructor() {
        const SCHEMA_TYPE = 'genres';
        super(SCHEMA_TYPE);
    }
}
module.exports.Genre = new Genre() 