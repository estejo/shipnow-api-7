import multer from 'multer';
import { CustomError } from '../errors/custom.errors.js';
import { ERROR_DICTIONARY, ERROR_CODES } from '../constants/error.dictionary.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  let errorInstance = err;

  // Multer Errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      errorInstance = new CustomError('FILE_TOO_LARGE');
    } else {
      errorInstance = new CustomError('BAD_REQUEST', `Error al procesar archivo: ${err.message}`);
    }
  }

  // Mongoose Errors
  if (err.name === 'ValidationError') {
    errorInstance = new CustomError('VALIDATION_ERROR', err.message);
  } else if (err.name === 'CastError') {
    errorInstance = new CustomError('BAD_REQUEST', `Formato de ID inválido: ${err.value}`);
  }

  const dictionary = ERROR_DICTIONARY || ERROR_CODES || {};
  const fallbackError = dictionary.INTERNAL_ERROR || {
    status: 500,
    code: 'INTERNAL_ERROR',
    message: 'Error interno del servidor',
  };

  const errorCode = errorInstance.code || 'INTERNAL_ERROR';
  const responseError = dictionary[errorCode] || fallbackError;
  const statusCode = errorInstance.status || responseError.status || 500;

  const logMessage = `[${responseError.code || errorCode}] ${req.method} ${req.originalUrl} - ${
    errorInstance.message || responseError.message
  }`;

  if (statusCode >= 500) {
    logger.error(logMessage);
  } else {
    logger.warning(logMessage);
  }

  return res.status(statusCode).json({
    status: 'error',
    code: responseError.code || errorCode,
    message: errorInstance.message || responseError.message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};