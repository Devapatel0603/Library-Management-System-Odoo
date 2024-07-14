class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    const message = err.message || "Internal server error";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export { errorHandler, ErrorHandler };
