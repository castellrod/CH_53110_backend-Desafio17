const CustomError = require('../errors/customError');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        const errorResponse = {
            code: err.code,
            message: err.message
        };
        logger.warning(`Sucedió un error Custom: ${err.message}`)
        return res.status(err.status).json(errorResponse);
    }

    const errorResponse = {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.'
    };
    logger.error(`Sucedió un error inesperado: ${err.message}`)
    return res.status(500).json(errorResponse);
}

module.exports = errorHandler;