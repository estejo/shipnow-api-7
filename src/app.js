import express from 'express';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(express.json());

// Logging de peticiones HTTP
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// Enrutador principal
app.use('/api', apiRouter);

// Middlewares de cierre
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
