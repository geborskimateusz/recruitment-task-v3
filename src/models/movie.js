const {Model} = require('./model')

class Movie extends Model {
    constructor() {
        const SCHEMA_TYPE = 'movies';
        super(SCHEMA_TYPE);
    }
}
module.exports = { Movie };