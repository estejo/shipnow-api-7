import { Router } from 'express';
import { uploader } from '../config/multer.config.js';
import { OrderModel } from '../models/order.model.js';
import { CustomError } from '../errors/custom.errors.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';

const router = Router();

// POST /api/orders/:id/receipt
router.post('/:id/receipt', uploader.single('receipt'), async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      throw new CustomError('MISSING_FILE');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('ORDER_NOT_FOUND');
    }

    const order = await OrderModel.findById(id);
    if (!order) {
      throw new CustomError('ORDER_NOT_FOUND');
    }

    const receiptData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    order.receipts.push(receiptData);
    await order.save();

    logger.info(`Comprobante '${req.file.originalname}' asociado a la orden ID: ${id}`);

    return res.status(200).json({
      status: 'success',
      message: 'Comprobante asociado exitosamente',
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

export default router;