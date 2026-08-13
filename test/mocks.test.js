import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de Tests: Módulo /api/mocks', () => {
  describe('GET /api/mocks/users', () => {
    it('Debe generar la cantidad especificada de usuarios en memoria (Status 200)', async () => {
      const res = await request(app).get('/api/mocks/users?qty=3');

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.be.an('array').with.lengthOf(3);
    });

    it('Debe devolver error con status 400 si el parámetro "qty" es un número negativo', async () => {
      const res = await request(app).get('/api/mocks/users?qty=-5');

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.code).to.equal('INVALID_QUANTITY');
    });
  });

  describe('POST /api/mocks/seed', () => {
    it('Debe poblar la base de datos de pruebas exitosamente (Status 201)', async () => {
      const res = await request(app).post('/api/mocks/seed?qty=2');

      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.have.property('usersInserted', 2);
      expect(res.body.data).to.have.property('ordersInserted', 2);
    });
  });
});