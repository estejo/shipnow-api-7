import { OrderModel } from '../models/order.model.js';

export class OrderRepository {
  async createMany(ordersData) {
    return await OrderModel.insertMany(ordersData);
  }

  async findAll() {
    return await OrderModel.find().populate('user', 'name email role');
  }
}