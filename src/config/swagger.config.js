import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './env.config.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShipNow API - Documentación Técnica',
      version: '1.0.0',
      description:
        'API RESTful profesional para la gestión de envíos, usuarios, productos, pedidos y entregas de ShipNow. Incluye módulos de simulación (Mocks), gestión centralizada de errores, monitoreo con Winston y especificación OpenAPI 3.0.',
      contact: {
        name: 'Soporte Técnico ShipNow',
        email: 'soporte@shipnow.test',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Servidor Local de Desarrollo',
      },
    ],
    tags: [
      { name: 'Users', description: 'Gestión de usuarios y clientes del sistema' },
      { name: 'Products', description: 'Catálogo de productos e inventarios' },
      { name: 'Mocks', description: 'Generación y simulación masiva de datos' },
      { name: 'Logger', description: 'Herramienta de validación interna de monitoreo' },
    ],
    components: {
      schemas: {
        // Esquema de Respuesta Exitosa Estándar
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            data: { type: 'object', description: 'Carga útil de la respuesta' },
          },
        },
        // Esquema de Respuesta de Error Estándar (Modulo 3)
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            code: { type: 'string', example: 'INVALID_QUANTITY' },
            message: {
              type: 'string',
              example: 'El parámetro "qty" debe ser un número entero positivo entre 1 y 100',
            },
            timestamp: { type: 'string', format: 'date-time', example: '2026-08-13T10:00:00.000Z' },
            path: { type: 'string', example: '/api/mocks/users?qty=-5' },
          },
        },
        // Entidad Usuario
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e6f' },
            name: { type: 'string', example: 'Ana Pérez' },
            email: { type: 'string', format: 'email', example: 'ana.perez@test.com' },
            role: { type: 'string', enum: ['ADMIN', 'USER', 'COURIER'], example: 'USER' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // Entidad Producto
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e70' },
            name: { type: 'string', example: 'Caja Cartón Reforzada' },
            price: { type: 'number', example: 150.50 },
            stock: { type: 'integer', example: 100 },
            status: { type: 'string', enum: ['AVAILABLE', 'OUT_OF_STOCK', 'DISCONTINUED'], example: 'AVAILABLE' },
            isDeleted: { type: 'boolean', example: false },
          },
        },
        // Entidad Pedido
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e71' },
            user: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e6f' },
            totalAmount: { type: 'number', example: 4500.00 },
            shippingAddress: { type: 'string', example: 'Av. Corrientes 1234, CABA' },
            status: { type: 'string', enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'], example: 'PENDING' },
            priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'], example: 'MEDIUM' },
          },
        },
        // Entidad Entrega
        Delivery: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e72' },
            order: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e71' },
            courier: { type: 'string', example: '6618d3f82e8f1a2b3c4d5e6f' },
            status: { type: 'string', enum: ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED'], example: 'ASSIGNED' },
            estimatedDeliveryDate: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Escanea anotaciones en archivos de rutas
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);