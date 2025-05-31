import express from 'express';
import { rolControllers } from '../controllers/index.js';
import { checkTokenUser } from '../middlewares/check-user.js';
import authGuard from '../middlewares/auth-guard.js';

const router = express.Router();

// Rutas protegidas solo para admsinistradores.
router.get(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.getAll
);

router.get(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.getById
);

// RUTA SIN USO. Debido a que aún no se creó el controlador correspondiente:
// router.get('/:id/users', rolControllers.getRoleUsers);

router.post(
  '/',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.create
);

router.put(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.update
);

router.delete(
  '/:id',
  checkTokenUser,
  authGuard(['admin']),
  rolControllers.delete
);

export default router;