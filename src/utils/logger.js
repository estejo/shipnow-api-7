import winston from 'winston';
import 'winston-daily-rotate-file';
import { config } from '../config/env.config.js';

// 1. Niveles de log personalizados y sus colores
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red bold',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
  },
};

winston.addColors(customLevels.colors);

// 2. Formato para salida por consola
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
  })
);

// 3. Formato plano para salida en archivo
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
  })
);

// 4. Transporte de archivo con rotación diaria (solo para error y fatal)
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // Mantiene logs por 14 días
  level: 'error',  // Captura niveles <= 1 (fatal y error)
  format: fileFormat,
});

// 5. Determinar el nivel de consola según el entorno
const isDevelopment = config.nodeEnv === 'development';
const consoleLevel = isDevelopment ? 'debug' : 'info';

export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: consoleLevel,
      format: consoleFormat,
    }),
    fileRotateTransport,
  ],
});