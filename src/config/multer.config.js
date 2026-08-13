import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CustomError } from '../errors/custom.errors.js';

// Crear carpetas de destino si no existen
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/other';

    if (req.baseUrl.includes('users')) {
      uploadPath = 'uploads/documents';
    } else if (req.baseUrl.includes('orders')) {
      uploadPath = 'uploads/receipts';
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new CustomError('INVALID_FILE_TYPE', `Tipo de archivo '${file.mimetype}' no permitido.`), false);
  }
};

export const uploader = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Máximo 5MB
  },
});