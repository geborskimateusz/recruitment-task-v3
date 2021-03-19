const {CustomError} = require('./custom-error');

class DatabaseError extends CustomError {
    constructor(message) {
      const statusCode = 500;
      super(statusCode, message);
    }
  }
  
  module.exports = {DatabaseError}