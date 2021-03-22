const { CustomError } = require('../errors/custom-error');
const { logger } = require('../logger');

//Catch any thrown error and return serialized json response
async function errorHandler(err, req, res, next) {
  logger.log({ message: err, level: 'error' });
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
}

module.exports = { errorHandler };