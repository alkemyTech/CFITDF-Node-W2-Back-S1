import express from 'express';
import { categoryControllers } from '../controllers/index.js';

const router = express.Router();


router.get('/', categoryControllers.getAll);
router.get('/:id', categoryControllers.getById);
router.get('/:id/books', categoryControllers.getCategoryBooks);
router.post('/', categoryControllers.create);
router.put('/:id', categoryControllers.update);
router.delete('/:id', categoryControllers.delete);

export default router;