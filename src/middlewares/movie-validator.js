const { createMovie } = require('../schemas/movie')

const validateMovieSchema = () => {

    return (req, res, next) => {
        const result = createMovie.validate(req.body);
        if (result.error) {
            const errors = result.error.details.map(detail => { return { error: detail.message } })
            return res.status(400).send({ errors })
        }
        next()
    };
}

module.exports = { validateMovieSchema }