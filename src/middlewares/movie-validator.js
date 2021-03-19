const { createMovie } = require('../schemas/movie')
const {ValidationError} = require('../errors/validation-error');

const validateMovieSchema = () => {

    return (req, res, next) => {
        const result = createMovie.validate(req.body);
        if (result.error) {
            const error = result.error.details.map(detail => { return detail.message  })
            throw new ValidationError(error)
        }
        next()
    };
}

module.exports = { validateMovieSchema }