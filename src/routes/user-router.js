import express from 'express';
import { userControllers } from '../controllers/index.js';

const router = express.Router();

router.get('/', userControllers.getAll);
router.get('/dni/:dni', userControllers.getByDni);
router.get('/role/:roleId', userControllers.getByRole);
router.get('/:id', userControllers.getById);
router.post('/', userControllers.create);
router.put('/:id', userControllers.update);
router.delete('/:id', userControllers.delete);

export default router;