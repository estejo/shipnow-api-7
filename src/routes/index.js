import { Router } from 'express';
import userRoutes from './user.routes.js';
import productRoutes from './product.routes.js';
import mockRoutes from './mock.routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/mocks', mockRoutes); // Expone la ruta /api/mocks

export default router;