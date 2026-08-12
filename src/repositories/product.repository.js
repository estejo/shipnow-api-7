import { ProductModel } from '../models/product.model.js';

export class ProductRepository {
  async findAllAvailable() {
    // Encapsula borrado lógico y exclusión de productos sin stock
    return await ProductModel.find({
      isDeleted: false,
      stock: { $gt: 0 },
    }).select('-__v');
  }

  async findById(id) {
    return await ProductModel.findOne({ _id: id, isDeleted: false }).select('-__v');
  }

  async create(productData) {
    return await ProductModel.create(productData);
  }

  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true }).select('-__v');
  }

  async updateStock(id, newStock, status) {
    return await ProductModel.findByIdAndUpdate(
      id,
      { stock: newStock, status },
      { new: true }
    ).select('-__v');
  }
}