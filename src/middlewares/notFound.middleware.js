import { NotFoundError } from '../errors/custom.errors.js';

export const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`La ruta solicitada '${req.originalUrl}' no existe en este servidor`));
};