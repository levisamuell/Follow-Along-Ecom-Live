  class ErrorHandler extends Error{

    constructor(message, statusCode){
        super(message);

        Error.captureStackTrace(this);
        this.stausCode = statusCode;
    }
}

module.exports = ErrorHandler;