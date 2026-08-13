import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/env.config.js';
import { logger } from './utils/logger.js';

async function startServer() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('Conexión exitosa a MongoDB establecida');

    app.listen(config.port, () => {
      logger.info(`Servidor ShipNow escuchando en el puerto ${config.port} (Entorno: ${config.nodeEnv})`);
    });
  } catch (error) {
    logger.fatal(`Fallo crítico al iniciar el servidor: ${error.message}`);
    process.exit(1);
  }
}

startServer();