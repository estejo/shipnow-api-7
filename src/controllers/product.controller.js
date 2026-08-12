export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.productService.getAvailableProducts();
      res.status(200).json({ status: 'success', data: products });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      res.status(200).json({ status: 'success', data: product });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  };

  createProduct = async (req, res) => {
    try {
      const newProduct = await this.productService.createProduct(req.body);
      res.status(201).json({ status: 'success', data: newProduct });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };
}