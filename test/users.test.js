import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import { UserModel } from '../src/models/user.model.js';

describe('Suite de Tests: Módulo /api/users', () => {
  describe('GET /api/users', () => {
    it('Debe retornar status 200 y una lista vacía cuando no hay usuarios', async () => {
      const res = await request(app).get('/api/users');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status', 'success');
      expect(res.body.data).to.be.an('array').that.is.empty;
    });

    it('Debe retornar status 200 y la lista con usuarios existentes', async () => {
      await UserModel.create({ name: 'Usuario Test', email: 'test@shipnow.com', role: 'USER' });

      const res = await request(app).get('/api/users');

      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array').with.lengthOf(1);
      expect(res.body.data[0]).to.have.property('email', 'test@shipnow.com');
    });
  });

  describe('POST /api/users', () => {
    it('Debe crear un usuario exitosamente con datos válidos (Status 201)', async () => {
      const newUser = {
        name: 'Carlos Gomez',
        email: 'carlos.gomez@shipnow.com',
        role: 'USER',
      };

      const res = await request(app).post('/api/users').send(newUser);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status', 'success');
      expect(res.body.data).to.have.property('_id');
      expect(res.body.data.name).to.equal(newUser.name);
    });

    it('Debe retornar un error con formato estándar si faltan campos obligatorios', async () => {
      const invalidUser = { name: 'Incompleto' };

      const res = await request(app).post('/api/users').send(invalidUser);

      expect(res.status).to.equal(422);
      expect(res.body).to.have.property('status', 'error');
      expect(res.body).to.have.property('code');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('path', '/api/users');
    });
  });

  describe('GET /api/users/:id', () => {
    it('Debe retornar status 400 si el formato del ID es inválido', async () => {
      const res = await request(app).get('/api/users/id-invalido-123');

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.code).to.equal('BAD_REQUEST');
    });

    it('Debe retornar status 404 si el usuario no existe en la base de datos', async () => {
      const nonExistentId = '6618d3f82e8f1a2b3c4d5e6f';
      const res = await request(app).get(`/api/users/${nonExistentId}`);

      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.code).to.equal('USER_NOT_FOUND');
    });
  });
});