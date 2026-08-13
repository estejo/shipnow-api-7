import { Router } from 'express';
import { uploader } from '../config/multer.config.js';
import { UserModel } from '../models/user.model.js';
import { CustomError } from '../errors/custom.errors.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';

const router = Router();

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      throw new CustomError('VALIDATION_ERROR', 'Path `email` is required.');
    }
    const newUser = await UserModel.create({ name, email, role });
    return res.status(201).json({ status: 'success', data: newUser });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('BAD_REQUEST', `Formato de ID inválido: ${id}`);
    }
    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomError('USER_NOT_FOUND');
    }
    return res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:id/documents
router.post('/:id/documents', uploader.single('document'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { docType = 'OTHER' } = req.body;

    const allowedDocTypes = ['DNI', 'LICENSE', 'TAX_ID', 'OTHER'];
    if (!allowedDocTypes.includes(docType)) {
      throw new CustomError('INVALID_DOC_TYPE');
    }

    if (!req.file) {
      throw new CustomError('MISSING_FILE');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('USER_NOT_FOUND');
    }

    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomError('USER_NOT_FOUND');
    }

    const documentData = {
      docType,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    user.documents.push(documentData);
    await user.save();

    logger.info(`Documento '${req.file.originalname}' cargado exitosamente para el usuario ID: ${id}`);

    return res.status(200).json({
      status: 'success',
      message: 'Documento cargado exitosamente',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;