import { Router } from 'express';
import { LoggerTestController } from '../controllers/loggerTest.controller.js';

const router = Router();
const loggerTestController = new LoggerTestController();

/**
 * @openapi
 * /logger-test:
 *   get:
 *     summary: Ejecutar prueba interna de emisión de logs (Winston)
 *     tags: [Logger]
 *     description: Endpoint exclusivo de desarrollo para validar que los 6 niveles de log (debug, http, info, warning, error, fatal) se escriban correctamente en consola y en archivos persistentes.
 *     responses:
 *       200:
 *         description: Prueba ejecutada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 message: { type: string, example: Prueba de logs ejecutada exitosamente. }
 *                 environment: { type: string, example: development }
 */
router.get('/', loggerTestController.testLogger);

export default router;