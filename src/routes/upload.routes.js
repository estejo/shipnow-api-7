const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { uploadFile } = require('../controllers/upload.controller');

/**
 * @openapi
 * /api/documents/upload:
 *   post:
 *     summary: Sube un documento al servidor
 *     tags:
 *       - Documentos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Archivo procesado y guardado exitosamente
 *       400:
 *         description: Archivo faltante o formato invalido
 */
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;