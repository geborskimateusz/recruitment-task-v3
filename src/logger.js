const winston = require('winston');
const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'error'
        }),
        new winston.transports.File({
            level: 'error',
            // Create the log directory if it does not exist
            filename: 'logs/logs.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

module.exports = { logger };