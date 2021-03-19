class CustomError extends Error {

    constructor(statusCode, messages) {
        super();
        this.statusCode = statusCode;
        this.messages = messages;
        this.serializeErrors = () => {
            return this.messages instanceof Array ?
                this.messages.map(message => { return { message } }) :
                [this.messages]
        }
    }
}

module.exports = { CustomError } 