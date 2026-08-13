import { logger } from '../utils/logger.js';

export class LoggerTestController {
  testLogger = (req, res) => {
    logger.debug('Log de prueba: Nivel DEBUG (Información detallada para depuración)');
    logger.http(`Log de prueba: Nivel HTTP (${req.method} ${req.originalUrl})`);
    logger.info('Log de prueba: Nivel INFO (Operación estándar realizada)');
    logger.warning('Log de prueba: Nivel WARNING (Advertencia sobre condición anómala)');
    logger.error('Log de prueba: Nivel ERROR (Error controlado de la aplicación)');
    logger.fatal('Log de prueba: Nivel FATAL (Falla crítica que compromete el servicio)');

    res.status(200).json({
      status: 'success',
      message: 'Prueba de logs ejecutada exitosamente. Revisa la consola y la carpeta /logs.',
      environment: process.env.NODE_ENV,
    });
  };
}