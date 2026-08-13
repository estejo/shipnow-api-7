import { MockGenerator } from '../utils/mock.generator.js';
import { USER_ROLES } from '../constants/index.js';

export class MockService {
  constructor(userRepository, orderRepository, deliveryRepository) {
    this.userRepository = userRepository;
    this.orderRepository = orderRepository;
    this.deliveryRepository = deliveryRepository;
  }

  // Genera usuarios en memoria sin persisitir
  getMockUsers(qty) {
    return MockGenerator.generateUsers(qty);
  }

  // Genera pedidos en memoria sin persistir
  getMockOrders(qty) {
    return MockGenerator.generateOrders(qty);
  }

  // Carga de datos masiva en MongoDB manteniendo las relaciones de dominio
  async seedDatabase(qty) {
    // 1. Crear usuarios y repartidores
    const mockUsersData = MockGenerator.generateUsers(qty);
    // Forzar que exista al menos un repartidor para mantener integridad relacional
    if (!mockUsersData.some(u => u.role === USER_ROLES.COURIER)) {
      mockUsersData[0].role = USER_ROLES.COURIER;
    }
    
    const createdUsers = await this.userRepository.createMany(mockUsersData);
    const userIds = createdUsers.map((u) => u._id);
    const courierIds = createdUsers
      .filter((u) => u.role === USER_ROLES.COURIER)
      .map((u) => u._id);

    // 2. Crear pedidos asignados a usuarios reales insertados
    const mockOrdersData = MockGenerator.generateOrders(qty, userIds);
    const createdOrders = await this.orderRepository.createMany(mockOrdersData);
    const orderIds = createdOrders.map((o) => o._id);

    // 3. Crear entregas asociadas a pedidos y repartidores reales insertados
    const activeCouriers = courierIds.length > 0 ? courierIds : userIds;
    const mockDeliveriesData = MockGenerator.generateDeliveries(qty, orderIds, activeCouriers);
    const createdDeliveries = await this.deliveryRepository.createMany(mockDeliveriesData);

    return {
      usersInserted: createdUsers.length,
      ordersInserted: createdOrders.length,
      deliveriesInserted: createdDeliveries.length,
      totalInserted: createdUsers.length + createdOrders.length + createdDeliveries.length,
    };
  }
}