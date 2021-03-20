const { Model } = require('../db/model')

class Movie extends Model {
    constructor() {
        const SCHEMA_TYPE = 'movies';
        super(SCHEMA_TYPE);

        this.create = async movie => await this.db.create(movie);
    }
}
module.exports = { movie: new Movie() } 