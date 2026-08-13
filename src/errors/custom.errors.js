import { ERROR_DICTIONARY, ERROR_CODES } from '../constants/error.dictionary.js';

export class CustomError extends Error {
  constructor(code, customMessage = null) {
    const dictionary = ERROR_DICTIONARY || ERROR_CODES || {};
    const errorInfo = dictionary[code] || { status: 500, message: 'Error interno del servidor' };

    super(customMessage || errorInfo.message);
    this.code = code || 'INTERNAL_ERROR';
    this.status = errorInfo.status || 500;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = null) {
    super('NOT_FOUND', message);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = null) {
    super('BAD_REQUEST', message);
  }
}

export class ValidationError extends CustomError {
  constructor(message = null) {
    super('VALIDATION_ERROR', message);
  }
}

export class InvalidQuantityError extends CustomError {
  constructor(message = null) {
    super('INVALID_QUANTITY', message);
  }
}

export class DatabaseError extends CustomError {
  constructor(message = null) {
    super('INTERNAL_ERROR', message);
  }
}