import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';

const app = express();

app.use(express.json());

// Rutas API
app.use('/api', apiRouter);

// Middlewares de gestión de errores (se ejecutan al no coincidir ninguna ruta o invocarse next(err))
app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('[DATABASE] Conexión exitosa a MongoDB');

    app.listen(config.port, () => {
      console.log(`[SERVER] Escuchando en el puerto ${config.port} (Entorno: ${config.nodeEnv})`);
    });
  } catch (error) {
    console.error('[SERVER ERROR] Fallo al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

startServer();