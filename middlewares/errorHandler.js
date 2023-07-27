const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    //construir respuesta
    const errorResponse = {
        error: {
         message: err.message || 'error interno del servidor',
         code: err.code || 'internal_error',
        },
    };
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;