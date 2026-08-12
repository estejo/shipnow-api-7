import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

// Validación de variables de entorno críticas
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`[CONFIG ERROR] La variable de entorno '${envVar}' es obligatoria y no está definida.`);
  }
}

export const config = Object.freeze({
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
});