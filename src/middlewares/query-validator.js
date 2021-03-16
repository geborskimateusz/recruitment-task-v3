const { ValidationError } = require('../errors/validation-error')
const { genre } = require('../models/genre')
const http = require('../util/http')

function validateQuery(...fields) {

    return (req, res, next) => {
        for (const field of fields) {
            if (req.query[field]) {
                try {
                    let param = req.query[field];
                    switch (field) {
                        case 'genres':
                            param = http.paramAsArray(param);
                            validateGenres(param)
                            break;
                    }
                } catch (err) {
                    return res.status(401).json(err.message)
                }
            }
        }
        next()
    };
}


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

}

module.exports = { validateQuery }