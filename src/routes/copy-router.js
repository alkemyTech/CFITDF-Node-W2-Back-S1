import express from 'express';
import { copyControllers } from '../controllers/index.js';

const router = express.Router();

router.get('/book/:bookId', copyControllers.getByBook);
router.get('/available/:bookId', copyControllers.getAvailableCopies);
router.get('/:id', copyControllers.getById);
router.post('/', copyControllers.create);
router.put('/:id', copyControllers.update);
router.delete('/:id', copyControllers.delete);

export default router;