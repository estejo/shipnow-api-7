# ShipNow API - Tests Funcionales Automatizados

Esta entrega incorpora una suite de pruebas funcionales automatizadas con Mocha, Chai y Supertest, garantizando la estabilidad de las respuestas HTTP, esquemas JSON y gestión centralizada de errores.

## Herramientas de Testing

- Mocha:Runner ejecutor de la suite de pruebas.
- Chai: Librería de aserciones para validar payloads y propiedades ('expect').
- Supertest: Cliente HTTP para testear endpoints Express sin levantar el servidor en puertos red.

## Requisitos de Entorno para Pruebas

Los tests utilizan una base de datos aislada configurada en '.env.test':
```env
PORT=3001
NODE_ENV=test
MONGO_URI=mongodb://127.0.0.1:27017/shipnow_test_db