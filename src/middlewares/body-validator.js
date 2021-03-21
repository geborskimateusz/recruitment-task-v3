const { validateMovieSchema } = require('../schemas/validation/movie-validator')

async function validateMovie(req, res, next) {
    try {
        await validateMovieSchema(req.body);
        next();
    } catch (err) {
        next(err)
    }
}

module.exports = { validateMovie }