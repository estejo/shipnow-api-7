export class MockController {
  constructor(mockService) {
    this.mockService = mockService;
  }

  getMockUsers = (req, res, next) => {
    try {
      const users = this.mockService.getMockUsers(req.query.qty);
      res.status(200).json({ status: 'success', data: users });
    } catch (error) {
      next(error);
    }
  };

  getMockOrders = (req, res, next) => {
    try {
      const orders = this.mockService.getMockOrders(req.query.qty);
      res.status(200).json({ status: 'success', data: orders });
    } catch (error) {
      next(error);
    }
  };

  seedDatabase = async (req, res, next) => {
    try {
      const result = await this.mockService.seedDatabase(req.query.qty);
      res.status(201).json({
        status: 'success',
        message: 'Base de datos poblada exitosamente',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}