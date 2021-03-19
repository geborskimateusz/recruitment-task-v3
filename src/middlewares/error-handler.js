const {CustomError} = require('../errors/custom-error');

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        console.log(err)
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
      }
    
      res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
      });
}

module.exports = { errorHandler }