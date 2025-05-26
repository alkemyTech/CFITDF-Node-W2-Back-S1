import express from 'express';
import { rolControllers } from '../controllers/index.js';

const router = express.Router();

router.get('/', rolControllers.getAll);
router.get('/:id', rolControllers.getById);
router.get('/:id/users', rolControllers.getRoleUsers);
router.post('/', rolControllers.create);
router.put('/:id', rolControllers.update);
router.delete('/:id', rolControllers.delete);

export default router;