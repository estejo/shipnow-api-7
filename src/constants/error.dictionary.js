export const ERROR_CODES = {
  BAD_REQUEST: {
    status: 400,
    code: 'BAD_REQUEST',
    message: 'Solicitud inválida',
  },
  INVALID_QUANTITY: {
    status: 400,
    code: 'INVALID_QUANTITY',
    message: 'El parámetro "qty" debe ser un número entero positivo entre 1 y 100',
  },
  INVALID_ID: {
    status: 400,
    code: 'INVALID_ID',
    message: 'Formato de ID inválido',
  },
  MISSING_FILE: {
    status: 400,
    code: 'MISSING_FILE',
    message: 'Es obligatorio adjuntar un archivo en el campo requerido',
  },
  INVALID_FILE_TYPE: {
    status: 400,
    code: 'INVALID_FILE_TYPE',
    message: 'Tipo de archivo no permitido',
  },
  INVALID_DOC_TYPE: {
    status: 400,
    code: 'INVALID_DOC_TYPE',
    message: 'El tipo de documento enviado no es válido',
  },
  FILE_TOO_LARGE: {
    status: 400,
    code: 'FILE_TOO_LARGE',
    message: 'El archivo excede el tamaño máximo permitido',
  },
  VALIDATION_ERROR: {
    status: 422,
    code: 'VALIDATION_ERROR',
    message: 'Error de validación de datos',
  },
  NOT_FOUND: {
    status: 404,
    code: 'NOT_FOUND',
    message: 'La ruta o recurso solicitado no existe',
  },
  USER_NOT_FOUND: {
    status: 404,
    code: 'USER_NOT_FOUND',
    message: 'El usuario especificado no existe',
  },
  ORDER_NOT_FOUND: {
    status: 404,
    code: 'ORDER_NOT_FOUND',
    message: 'El pedido u operación especificada no existe',
  },
  INTERNAL_ERROR: {
    status: 500,
    code: 'INTERNAL_ERROR',
    message: 'Error interno del servidor',
  },
};

export const ERROR_DICTIONARY = ERROR_CODES;