import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { DeliveryRepository } from '../repositories/delivery.repository.js';
import { MockService } from '../services/mock.service.js';
import { MockController } from '../controllers/mock.controller.js';

const router = Router();

// Inyección de dependencias
const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const deliveryRepository = new DeliveryRepository();

const mockService = new MockService(userRepository, orderRepository, deliveryRepository);
const mockController = new MockController(mockService);

router.get('/users', mockController.getMockUsers);
router.get('/orders', mockController.getMockOrders);
router.post('/seed', mockController.seedDatabase);

export default router;