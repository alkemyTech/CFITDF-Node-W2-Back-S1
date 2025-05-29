import express from 'express';
import { categoryControllers } from '../controllers/index.js';

const router = express.Router();


router.get('/', categoryControllers.getAll);
router.get('/:id', categoryControllers.getById);
//router.get('/:id/books', categoryControllers.getCategoryBooks); Aun no se creo el controlador para obtener los libros de una categoria
router.post('/', categoryControllers.create);
router.put('/:id', categoryControllers.update);
router.delete('/:id', categoryControllers.delete);

export default router;