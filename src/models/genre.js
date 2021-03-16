const { Model } = require('../db/model')

class Genre extends Model {
    constructor() {
        const SCHEMA_TYPE = 'genres';
        super(SCHEMA_TYPE);
    }
}
module.exports = { genre: new Genre() } 