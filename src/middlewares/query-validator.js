//walidacja czy są takie genres 
const { ValidationError } = require('../errors/validation-error')
const models = require('../models/index.js')

function validateQuery(...fields) {

    return (req, res, next) => {
        for (const field of fields) {
            if (req.query[field]) { 
                try {
                    let param = req.query[field];
                    switch (field) {
                        case 'genres':
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
    const fromDB = models.genre.findAll()

    const validationArr = genres.reduce((acc, e) => {
        if (!fromDB.includes(e)) {
            console.log("Does not include ", e)
            acc.push(e)
        }
        return acc
    }, [])

    if (validationArr.length !== 0) {
        throw new ValidationError(`Missing genres ${validationArr}`);
    }

}

module.exports = { validateQuery }