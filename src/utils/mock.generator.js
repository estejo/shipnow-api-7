import { faker } from '@faker-js/faker';
import {
  USER_ROLES,
  ORDER_STATUS,
  ORDER_PRIORITY,
  DELIVERY_STATUS,
} from '../constants/index.js';

export class MockGenerator {
  static generateUsers(qty = 5) {
    const users = [];
    const roles = [USER_ROLES.USER, USER_ROLES.COURIER, USER_ROLES.ADMIN];

    for (let i = 0; i < qty; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(roles),
        isActive: true,
      });
    }
    return users;
  }

  static generateOrders(qty = 5, userIds = []) {
    const orders = [];
    const statuses = Object.values(ORDER_STATUS);
    const priorities = Object.values(ORDER_PRIORITY);

    for (let i = 0; i < qty; i++) {
      orders.push({
        user: userIds.length > 0 ? faker.helpers.arrayElement(userIds) : faker.database.mongodbObjectId(),
        totalAmount: parseFloat(faker.commerce.price({ min: 100, max: 15000 })),
        shippingAddress: faker.location.streetAddress({ useFullAddress: true }),
        status: faker.helpers.arrayElement(statuses),
        priority: faker.helpers.arrayElement(priorities),
      });
    }
    return orders;
  }

  static generateDeliveries(qty = 5, orderIds = [], courierIds = []) {
    const deliveries = [];
    const statuses = Object.values(DELIVERY_STATUS);

    for (let i = 0; i < qty; i++) {
      deliveries.push({
        order: orderIds.length > 0 ? faker.helpers.arrayElement(orderIds) : faker.database.mongodbObjectId(),
        courier: courierIds.length > 0 ? faker.helpers.arrayElement(courierIds) : faker.database.mongodbObjectId(),
        status: faker.helpers.arrayElement(statuses),
        estimatedDeliveryDate: faker.date.soon({ days: 5 }),
      });
    }
    return deliveries;
  }
}