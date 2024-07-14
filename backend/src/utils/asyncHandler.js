const asyncHandler =
    (fn, errorTypes = []) =>
    async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (errorTypes.length > 0) {
                const matchedErrorType = errorTypes.find(
                    (e) => error instanceof e.type
                );
                if (matchedErrorType) {
                    error.statusCode = matchedErrorType.statusCode;
                    error.message = matchedErrorType.message;
                }
            }
            next(error);
        }
    };
export { asyncHandler };
