const { ValidationError } = require('../errors/validation-error')
const { genre } = require('../models/genre')
const { createMovie } = require('../schemas/movie')

const validateGenres = (genres) => {
    const fromDB = genre.find()
    const validationArr = genres.reduce((acc, e) => {
        if (!fromDB.includes(e)) {
            acc.push(e)
        }
        return acc
    }, [])

    if (validationArr.length !== 0) {
        throw new ValidationError(`Missing genres ${validationArr}`);
    }

    return genres;
}

const validateMovieSchema = () => {

    return (req, res, next) => {
        const result = createMovie.validate(req.body);
        if (result.error) {
            return res.status(400).send(result)
        }
        next()
    };
}

module.exports = { validateGenres, validateMovieSchema }