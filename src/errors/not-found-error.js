const { CustomError } = require('./custom-error');

class NotFoundError extends CustomError {
    constructor() {
        const statusCode = 404;
        const message = 'Route not found';
        super(statusCode, message);
    }
}

module.exports = { NotFoundError }