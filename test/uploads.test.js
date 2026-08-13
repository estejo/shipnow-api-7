import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import { UserModel } from '../src/models/user.model.js';
import { OrderModel } from '../src/models/order.model.js';

describe('Suite de Tests: Carga de Archivos con Multer', () => {
  let createdUser;
  let createdOrder;

  beforeEach(async () => {
    createdUser = await UserModel.create({
      name: 'Usuario Upload Test',
      email: 'upload@shipnow.com',
    });

    createdOrder = await OrderModel.create({
      user: createdUser._id,
      totalAmount: 1500,
      shippingAddress: 'Calle Falsa 123',
    });
  });

  describe('POST /api/users/:id/documents', () => {
    it('Debe subir un documento válido y asociar metadatos al usuario (Status 200)', async () => {
      const res = await request(app)
        .post(`/api/users/${createdUser._id}/documents`)
        .field('docType', 'DNI')
        .attach('document', Buffer.from('contenido-pdf-dummy'), 'dni-prueba.pdf');

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data.documents).to.be.an('array').with.lengthOf(1);
      expect(res.body.data.documents[0]).to.have.property('docType', 'DNI');
      expect(res.body.data.documents[0]).to.have.property('originalName', 'dni-prueba.pdf');
    });

    it('Debe devolver error 400 si falta adjuntar el archivo', async () => {
      const res = await request(app)
        .post(`/api/users/${createdUser._id}/documents`)
        .field('docType', 'DNI');

      expect(res.status).to.equal(400);
      expect(res.body.code).to.equal('MISSING_FILE');
    });

    it('Debe devolver error 400 si se envía un tipo de archivo no permitido (.exe)', async () => {
      const res = await request(app)
        .post(`/api/users/${createdUser._id}/documents`)
        .attach('document', Buffer.from('malware'), 'archivo.exe');

      expect(res.status).to.equal(400);
      expect(res.body.code).to.equal('INVALID_FILE_TYPE');
    });

    it('Debe devolver error 400 si el docType no es válido', async () => {
      const res = await request(app)
        .post(`/api/users/${createdUser._id}/documents`)
        .field('docType', 'TIPO_INVALIDO')
        .attach('document', Buffer.from('pdf'), 'test.pdf');

      expect(res.status).to.equal(400);
      expect(res.body.code).to.equal('INVALID_DOC_TYPE');
    });
  });

  describe('POST /api/orders/:id/receipt', () => {
    it('Debe asociar un comprobante a una orden existente (Status 200)', async () => {
      const res = await request(app)
        .post(`/api/orders/${createdOrder._id}/receipt`)
        .attach('receipt', Buffer.from('factura-imagen'), 'comprobante.jpg');

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data.receipts).to.be.an('array').with.lengthOf(1);
      expect(res.body.data.receipts[0]).to.have.property('originalName', 'comprobante.jpg');
    });

    it('Debe devolver error 404 si la orden no existe', async () => {
      const nonExistentId = '6618d3f82e8f1a2b3c4d5e6f';
      const res = await request(app)
        .post(`/api/orders/${nonExistentId}/receipt`)
        .attach('receipt', Buffer.from('factura'), 'comprobante.jpg');

      expect(res.status).to.equal(404);
      expect(res.body.code).to.equal('ORDER_NOT_FOUND');
    });
  });
});