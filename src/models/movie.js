const { Model } = require('../db/model')
const database = require('../db/database');

class Movie extends Model {
    constructor() {
        const SCHEMA_TYPE = 'movies';
        super(SCHEMA_TYPE);

        this.create = movie => this.db.create(movie);
    }
}
module.exports = { movie: new Movie() } 