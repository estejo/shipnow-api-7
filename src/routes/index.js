import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import mockRoutes from './mock.routes.js';
import userRoutes from './user.routes.js';
import orderRoutes from './order.routes.js';
import { logger } from '../utils/logger.js';

const router = Router();

// Swagger Documentation Route
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'ShipNow API',
    version: '1.0.0',
    description: 'Documentación de la API de ShipNow',
  },
  paths: {},
};

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logger Test Route
router.get('/logger-test', (req, res) => {
  logger.debug('Log de prueba: Nivel DEBUG (Información detallada para depuración)');
  logger.http(`Log de prueba: Nivel HTTP (${req.method} ${req.originalUrl})`);
  logger.info('Log de prueba: Nivel INFO (Operación estándar realizada)');
  logger.warning('Log de prueba: Nivel WARNING (Advertencia sobre condición anómala)');
  logger.error('Log de prueba: Nivel ERROR (Error controlado de la aplicación)');
  logger.fatal('Log de prueba: Nivel FATAL (Falla crítica que compromete el servicio)');

  return res.status(200).json({
    status: 'success',
    message: 'Prueba de logs ejecutada exitosamente', // <-- Ajustado "logs"
  });
});

// Enrutadores de Negocio
router.use('/mocks', mockRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

export default router;