const { createMovie } = require('../../schemas/movie')
const { ValidationError } = require('../../errors/validation-error');

const validateMovieSchema = async movie => {
    const result = createMovie.validate(movie);
    if (result.error) {
        const error = result.error.details.map(detail => { return detail.message })
        throw new ValidationError(error)
    }
}

module.exports = { validateMovieSchema }