const http = require('../util/http')
const { validateGenres } = require('./schema-validator')

// Validate query parameters from incoming request. 
function validateQuery(...fields) {

    return (req, res, next) => {
        for (const field of fields) {
            if (req.query[field]) {
                let param = req.query[field];
                switch (field) {
                    case 'genres':
                        param = http.paramAsArray(param);
                        validateGenres(param)
                        break;
                }
            }
        }
        next()
    };
}

module.exports = { validateQuery }