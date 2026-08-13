import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(express.json());

// Log de peticiones HTTP en desarrollo
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('Conexión exitosa a MongoDB establecida');

    app.listen(config.port, () => {
      logger.info(`Servidor ShipNow escuchando en el puerto ${config.port} (Entorno: ${config.nodeEnv})`);
    });
  } catch (error) {
    logger.fatal(`Fallo crítico al iniciar el servidor o conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
}

startServer();

startServer();