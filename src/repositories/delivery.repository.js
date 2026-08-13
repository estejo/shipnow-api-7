import { DeliveryModel } from '../models/delivery.model.js';

export class DeliveryRepository {
  async createMany(deliveriesData) {
    return await DeliveryModel.insertMany(deliveriesData);
  }

  async findAll() {
    return await DeliveryModel.find()
      .populate('order')
      .populate('courier', 'name email role');
  }
}