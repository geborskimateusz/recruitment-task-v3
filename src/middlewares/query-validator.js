const http = require('../util/http')
const { validateGenres } = require('../schemas/validation/genres-validator')

async function queryValidator(req, res, next) {
    try {
        for (const query of Object.keys(req.query)) {
            let param = req.query[query];
            switch (query) {
                case 'genres':
                    param = http.paramAsArray(param);
                    await validateGenres(param)
                    break;
            }
        }
        next();
    } catch (err) {
        next(err)
    }
};



module.exports = { queryValidator }