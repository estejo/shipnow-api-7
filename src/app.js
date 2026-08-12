import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

// Inicio del servidor y conexión a base de datos
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