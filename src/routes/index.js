import { Router } from 'express';
import userRoutes from './user.routes.js';
import productRoutes from './product.routes.js';
import mockRoutes from './mock.routes.js';
import loggerTestRoutes from './loggerTest.routes.js';
import docsRoutes from './docs.routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/mocks', mockRoutes);
router.use('/logger-test', loggerTestRoutes);
router.use('/docs', docsRoutes); // Expone la UI en /api/docs

export default router;