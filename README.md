# ShipNow API - Módulo de Mocking y Carga de Datos

Este módulo permite simular e insertar datos masivos de prueba (Usuarios, Repartidores, Pedidos y Entregas) asegurando la integridad de las relaciones del dominio y el uso de constantes centralizadas.

# Justificación Arquitectónica

* La lógica de generación estocástica de datos reside en src/utils/mock.generator.js.

* MockService coordina múltiples repositorios (UserRepository, OrderRepository, DeliveryRepository) para garantizar que las referencias ObjectId sean válidas al momento del guardado.

## Instalación y Preparación

1. Instalar dependencias:
   ```bash
   npm install

# Endpoints de Mocking (/api/mocks)

1. Obtener Usuarios Simulados (Sin guardar en DB)
URL: GET /api/mocks/users?qty=5
Descripción: Genera una lista de usuarios en memoria con roles válidos (ADMIN, USER, COURIER)

2. Obtener Pedidos Simulados (Sin guardar en DB)
URL: GET /api/mocks/orders?qty=5
Descripción: Genera pedidos simulados con prioridades y estados de la aplicación


3. Poblar la Base de Datos (Seed a MongoDB)
URL: POST /api/mocks/seed?qty=10
Descripción: Crea e inserta simultáneamente N registros de usuarios, pedidos y entregas en MongoDB de forma coherente y vinculada

