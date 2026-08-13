import { MockGenerator } from '../utils/mock.generator.js';
import { USER_ROLES } from '../constants/index.js';
import { InvalidQuantityError, DatabaseError } from '../errors/custom.errors.js';
import { logger } from '../utils/logger.js';

export class MockService {
  constructor(userRepository, orderRepository, deliveryRepository) {
    this.userRepository = userRepository;
    this.orderRepository = orderRepository;
    this.deliveryRepository = deliveryRepository;
  }

  _parseAndValidateQty(qty) {
    const parsed = Number(qty);
    if (!qty || isNaN(parsed) || !Number.isInteger(parsed) || parsed <= 0 || parsed > 100) {
      logger.warning(`Intento de generación de mocks con cantidad inválida: '${qty}'`);
      throw new InvalidQuantityError('El parámetro "qty" debe ser un número entero positivo entre 1 y 100');
    }
    return parsed;
  }

  getMockUsers(qty = 5) {
    const validQty = this._parseAndValidateQty(qty);
    logger.debug(`Generando ${validQty} usuarios simulados en memoria`);
    return MockGenerator.generateUsers(validQty);
  }

  getMockOrders(qty = 5) {
    const validQty = this._parseAndValidateQty(qty);
    logger.debug(`Generando ${validQty} pedidos simulados en memoria`);
    return MockGenerator.generateOrders(validQty);
  }

  async seedDatabase(qty = 10) {
    const validQty = this._parseAndValidateQty(qty);
    logger.info(`Iniciando proceso de Seed en MongoDB para ${validQty} entidades...`);

    try {
      const mockUsersData = MockGenerator.generateUsers(validQty);
      if (!mockUsersData.some((u) => u.role === USER_ROLES.COURIER)) {
        mockUsersData[0].role = USER_ROLES.COURIER;
      }

      const createdUsers = await this.userRepository.createMany(mockUsersData);
      const userIds = createdUsers.map((u) => u._id);
      const courierIds = createdUsers
        .filter((u) => u.role === USER_ROLES.COURIER)
        .map((u) => u._id);

      const mockOrdersData = MockGenerator.generateOrders(validQty, userIds);
      const createdOrders = await this.orderRepository.createMany(mockOrdersData);
      const orderIds = createdOrders.map((o) => o._id);

      const activeCouriers = courierIds.length > 0 ? courierIds : userIds;
      const mockDeliveriesData = MockGenerator.generateDeliveries(validQty, orderIds, activeCouriers);
      const createdDeliveries = await this.deliveryRepository.createMany(mockDeliveriesData);

      logger.info(`Seed completado: ${createdUsers.length} usuarios, ${createdOrders.length} pedidos, ${createdDeliveries.length} entregas.`);

      return {
        usersInserted: createdUsers.length,
        ordersInserted: createdOrders.length,
        deliveriesInserted: createdDeliveries.length,
        totalInserted: createdUsers.length + createdOrders.length + createdDeliveries.length,
      };
    } catch (error) {
      logger.error(`Error durante el poblamiento de MongoDB: ${error.message}`);
      throw new DatabaseError(`Fallo al poblar la base de datos: ${error.message}`);
    }
  }
}