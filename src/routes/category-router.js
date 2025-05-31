import express from 'express';
import { categoryControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

// Rutas protegidas (solo administradores)
router.post(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  categoryControllers.create
);

router.put(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  categoryControllers.update
);

router.delete(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  categoryControllers.delete
);

// Rutas públicas
router.get('/', categoryControllers.getAll);
router.get('/:id', categoryControllers.getById);

// RUTA SIN USO. Debido a que aun no se creó el controlador correspondiente.
// router.get('/:id/books', categoryControllers.getCategoryBooks);

export default router;
