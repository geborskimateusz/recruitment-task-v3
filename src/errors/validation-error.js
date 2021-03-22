const { CustomError } = require('./custom-error');

class ValidationError extends CustomError {
  constructor(message) {
    const statusCode = 400;
    super(statusCode, message);
  }
}

module.exports = { ValidationError };