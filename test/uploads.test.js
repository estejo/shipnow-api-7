const request = require('supertest');
const path = require('path');
const app = require('../src/app');

describe('POST /api/documents/upload', () => {
  it('Debe subir un archivo PDF o imagen exitosamente', async () => {
    const sampleFilePath = path.join(__dirname, 'fixtures/sample.pdf');

    const response = await request(app)
      .post('/api/documents/upload')
      .attach('file', sampleFilePath);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty('filename');
    expect(response.body.data).toHaveProperty('path');
  });

  it('Debe devolver un código 400 si no se adjunta ningún archivo', async () => {
    const response = await request(app)
      .post('/api/documents/upload');

    expect(response.statusCode).toBe(400);
  });
});