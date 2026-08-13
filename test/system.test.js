import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de Tests: Rutas del Sistema y Documentación', () => {
  it('GET /api/docs/ - Debe responder correctamente la documentación de Swagger', async () => {
    const res = await request(app).get('/api/docs/');

    expect([200, 301]).to.include(res.status);
  });

  it('GET /api/logger-test - Debe ejecutar la prueba de logs con status 200', async () => {
    const res = await request(app).get('/api/logger-test');

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.include('Prueba de logs ejecutada exitosamente');
  });

  it('GET /api/ruta-inexistente - Debe retornar formato JSON estándar 404 NOT_FOUND', async () => {
    const res = await request(app).get('/api/ruta-inexistente');

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.include({
      status: 'error',
      code: 'NOT_FOUND',
      path: '/api/ruta-inexistente',
    });
  });
});