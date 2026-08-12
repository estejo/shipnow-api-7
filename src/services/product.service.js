import { PRODUCT_STATUS } from '../constants/index.js';

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getAvailableProducts() {
    // Filtro de negocio opcional adicional sobre la lista del repositorio
    const products = await this.productRepository.findAllAvailable();
    return products.filter((p) => p.status === PRODUCT_STATUS.AVAILABLE);
  }

  async getProductById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  async createProduct(productData) {
    if (productData.price <= 0) {
      throw new Error('El precio del producto debe ser mayor a cero');
    }

    const status = productData.stock > 0 
      ? PRODUCT_STATUS.AVAILABLE 
      : PRODUCT_STATUS.OUT_OF_STOCK;

    return await this.productRepository.create({ ...productData, status });
  }

  async updateStock(id, quantityToReduce) {
    const product = await this.getProductById(id);

    if (product.stock < quantityToReduce) {
      throw new Error('Stock insuficiente para realizar la operación');
    }

    const newStock = product.stock - quantityToReduce;
    const newStatus = newStock === 0 ? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE;

    return await this.productRepository.updateStock(id, newStock, newStatus);
  }
}