import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { DeliveryRepository } from '../repositories/delivery.repository.js';
import { MockService } from '../services/mock.service.js';
import { MockController } from '../controllers/mock.controller.js';

const router = Router();
const mockService = new MockService(new UserRepository(), new OrderRepository(), new DeliveryRepository());
const mockController = new MockController(mockService);

/**
 * @openapi
 * /mocks/users:
 *   get:
 *     summary: Generar usuarios simulados en memoria (Sin persistir)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Cantidad de usuarios simulados a generar (1-100)
 *     responses:
 *       200:
 *         description: Array de usuarios ficticios generados por Faker
 *       400:
 *         description: Cantidad inválida, no numérica o fuera de rango
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/users', mockController.getMockUsers);

/**
 * @openapi
 * /mocks/orders:
 *   get:
 *     summary: Generar pedidos simulados en memoria (Sin persistir)
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Cantidad de pedidos ficticios
 *     responses:
 *       200:
 *         description: Array de pedidos ficticios
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/orders', mockController.getMockOrders);

/**
 * @openapi
 * /mocks/seed:
 *   post:
 *     summary: Poblar la base de datos con registros simulados conectados
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros a insertar por colección
 *     responses:
 *       201:
 *         description: Base de datos poblada exitosamente
 *       400:
 *         description: Parámetro qty inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error en MongoDB durante el guardado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/seed', mockController.seedDatabase);

export default router;