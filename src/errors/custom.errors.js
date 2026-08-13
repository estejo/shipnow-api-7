import { ERROR_CODES } from '../constants/error.dictionary.js';

export class AppError extends Error {
  constructor(errorType, message) {
    super(message || errorType.code);
    this.statusCode = errorType.status;
    this.code = errorType.code;
    this.isOperational = true; // Identifica errores controlados de la app
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Petición incorrecta o parámetros inválidos') {
    super(ERROR_CODES.BAD_REQUEST, message);
  }
}

export class InvalidQuantityError extends AppError {
  constructor(message = 'La cantidad especificada debe ser un entero positivo válido entre 1 y 100') {
    super(ERROR_CODES.INVALID_QUANTITY, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(ERROR_CODES.NOT_FOUND, message);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message = 'El usuario solicitado no existe') {
    super(ERROR_CODES.USER_NOT_FOUND, message);
  }
}

export class ProductNotFoundError extends AppError {
  constructor(message = 'El producto solicitado no existe') {
    super(ERROR_CODES.PRODUCT_NOT_FOUND, message);
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(message = 'El correo electrónico ya está registrado') {
    super(ERROR_CODES.USER_ALREADY_EXISTS, message);
  }
}

export class InsufficientStockError extends AppError {
  constructor(message = 'Stock insuficiente para realizar la operación') {
    super(ERROR_CODES.INSUFFICIENT_STOCK, message);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Error durante la operación en la base de datos') {
    super(ERROR_CODES.DATABASE_ERROR, message);
  }
}