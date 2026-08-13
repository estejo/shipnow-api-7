# ShipNow API - Carga de Archivos y Metadatos (Multer)

Esta entrega añade el soporte para la recepción, validación, almacenamiento físico local y registro de metadatos de documentos y comprobantes mediante **Multer** y peticiones `multipart/form-data`.

## Estructura de Almacenamiento

Los archivos cargados se distribuyen dinámicamente según la entidad de origen (excluidos del repositorio mediante `.gitignore`):
- `uploads/documents/`: Documentos personales de usuarios (DNI, licencias, etc.).
- `uploads/receipts/`: Comprobantes operacionales asociados a pedidos/entregas.

## Endpoints de Carga

1. **`POST /api/users/:id/documents`**
   - Campo form-data: `document` (Binary file - PDF, JPG, PNG, máx 5MB).
   - Campo adicional: `docType` (`DNI`, `LICENSE`, `TAX_ID`, `OTHER`).
2. **`POST /api/orders/:id/receipt`**
   - Campo form-data: `receipt` (Binary file - PDF, JPG, PNG, máx 5MB).

## Ejecución de Pruebas

```bash
npm test