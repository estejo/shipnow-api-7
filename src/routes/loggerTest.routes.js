import { Router } from 'express';
import { LoggerTestController } from '../controllers/loggerTest.controller.js';

const router = Router();
const loggerTestController = new LoggerTestController();

router.get('/', loggerTestController.testLogger);

export default router;