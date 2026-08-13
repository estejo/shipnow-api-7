export const ERROR_CODES = Object.freeze({
  BAD_REQUEST: { code: 'BAD_REQUEST', status: 400 },
  INVALID_QUANTITY: { code: 'INVALID_QUANTITY', status: 400 },
  NOT_FOUND: { code: 'NOT_FOUND', status: 404 },
  USER_NOT_FOUND: { code: 'USER_NOT_FOUND', status: 404 },
  PRODUCT_NOT_FOUND: { code: 'PRODUCT_NOT_FOUND', status: 404 },
  ORDER_NOT_FOUND: { code: 'ORDER_NOT_FOUND', status: 404 },
  USER_ALREADY_EXISTS: { code: 'USER_ALREADY_EXISTS', status: 409 },
  INSUFFICIENT_STOCK: { code: 'INSUFFICIENT_STOCK', status: 400 },
  VALIDATION_ERROR: { code: 'VALIDATION_ERROR', status: 422 },
  DATABASE_ERROR: { code: 'DATABASE_ERROR', status: 500 },
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', status: 500 },
});