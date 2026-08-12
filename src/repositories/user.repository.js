import { UserModel } from '../models/user.model.js';

export class UserRepository {
  async findAllActive() {
    // Proyección para excluir campos sensibles o innecesarios y filtro por defecto
    return await UserModel.find({ isActive: true }).select('-__v');
  }

  async findById(id) {
    return await UserModel.findOne({ _id: id, isActive: true }).select('-__v');
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true }).select('-__v');
  }

  async softDelete(id) {
    return await UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}