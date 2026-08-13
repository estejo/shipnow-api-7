import { ERROR_CODES } from '../constants/error.dictionary.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || ERROR_CODES.INTERNAL_SERVER_ERROR.status;
  let code = err.code || ERROR_CODES.INTERNAL_SERVER_ERROR.code;
  let message = err.message || 'Error interno del servidor';

  // Manejo especial de errores nativos de Mongoose / MongoDB
  if (err.name === 'CastError') {
    statusCode = ERROR_CODES.BAD_REQUEST.status;
    code = ERROR_CODES.BAD_REQUEST.code;
    message = `Formato de ID inválido: ${err.value}`;
  } else if (err.name === 'ValidationError') {
    statusCode = ERROR_CODES.VALIDATION_ERROR.status;
    code = ERROR_CODES.VALIDATION_ERROR.code;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  } else if (err.code === 11000) {
    statusCode = ERROR_CODES.USER_ALREADY_EXISTS.status;
    code = ERROR_CODES.USER_ALREADY_EXISTS.code;
    message = 'Clave duplicada: el registro ya existe en la base de datos';
  }

  // Log de error en consola
  console.error(`[ERROR HANDLER] [${code}] - Path: ${req.originalUrl} - ${message}`);

  res.status(statusCode).json({
    status: 'error',
    code,
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};