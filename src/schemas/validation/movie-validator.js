const { createMovie } = require('../../schemas/movie')
const { ValidationError } = require('../../errors/validation-error');

const validateMovieSchema = async movie => {
    try {
        await createMovie.validateAsync(movie);
    } catch (err) {
        let errorMessage;
        if (err.details) {
            errorMessage = err.details.map(detail => { return detail.message })
        } else {
            errorMessage = [err.messages]
        }

        throw new ValidationError(errorMessage)

    }
}

module.exports = { validateMovieSchema }