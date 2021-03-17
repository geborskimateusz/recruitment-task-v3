const http = require('../util/http')
const { validateGenres  } = require('./schema-validator')

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

module.exports = { validateQuery }