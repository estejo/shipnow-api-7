import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger.config.js';

const router = Router();

// Servidor interactivo de Swagger UI en /api/docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;