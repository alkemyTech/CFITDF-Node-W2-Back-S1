import express from 'express';
import { copyControllers } from '../controllers/index.js';
import { validateCopyData } from '../middlewares/validate-copy-data.js'; // Importamos el middleware de validación

const router = express.Router();

// Se aplica el middleware validateCopyData antes de cada controlador relevante
// Esto asegura que los parámetros de ruta y body sean correctos antes de ejecutar la lógica del controlador
router.get('/book/:bookId', validateCopyData, copyControllers.getByBook);
router.get('/available/:bookId', validateCopyData, copyControllers.getAvailableCopies);
router.get('/:id', validateCopyData, copyControllers.getById);
router.post('/', validateCopyData, copyControllers.create);
router.put('/:id', validateCopyData, copyControllers.update);
router.delete('/:id', validateCopyData, copyControllers.delete);

export default router;