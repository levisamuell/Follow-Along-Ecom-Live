class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);

        Error.captureStackTrace();
        this.stausCode = statusCode;
    }
}

module.exports = ErrorHandler;