export class MockController {
  constructor(mockService) {
    this.mockService = mockService;
  }

  getMockUsers = async (req, res) => {
    try {
      const qty = parseInt(req.query.qty) || 5;
      const users = this.mockService.getMockUsers(qty);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  getMockOrders = async (req, res) => {
    try {
      const qty = parseInt(req.query.qty) || 5;
      const orders = this.mockService.getMockOrders(qty);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  seedDatabase = async (req, res) => {
    try {
      const qty = parseInt(req.query.qty) || 10;
      const result = await this.mockService.seedDatabase(qty);
      res.status(201).json({
        message: 'Base de datos poblada exitosamente',
        insertados: result.totalInserted,
        detalle: {
          usuarios: result.usersInserted,
          pedidos: result.ordersInserted,
          entregas: result.deliveriesInserted,
        },
      });
    } 
    catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
}