/**
 * Copy Router
 * 
 * Handles copy-related routes.
 */

import express from 'express';
import { copyControllers } from '../controllers/index.js';
import { validateCopyData } from '../middlewares/validate-copy-data.js'; // Validation middleware

const router = express.Router();

/**
 * Routes with validation middleware
 */
// Se aplica el middleware validateCopyData antes de cada controlador relevante
// Esto asegura que los parámetros de ruta y body sean correctos antes de ejecutar la lógica del controlador

/**
 * Retrieves copies by book ID.
 * 
 * @route GET /book/:bookId
 * @description Retrieves a list of copies by book ID.
 */
router.get('/book/:bookId', validateCopyData, copyControllers.getByBook);

/**
 * Retrieves available copies by book ID.
 * 
 * @route GET /available/:bookId
 * @description Retrieves a list of available copies by book ID.
 */
router.get('/available/:bookId', validateCopyData, copyControllers.getAvailableCopies);

/**
 * Retrieves a copy by ID.
 * 
 * @route GET /:id
 * @description Retrieves a copy by ID.
 */
router.get('/:id', validateCopyData, copyControllers.getById);

/**
 * Creates a new copy.
 * 
 * @route POST /
 * @description Creates a new copy and returns its ID.
 */
router.post('/', validateCopyData, copyControllers.create);

/**
 * Updates an existing copy.
 * 
 * @route PUT /:id
 * @description Updates an existing copy and returns its updated data.
 */
router.put('/:id', validateCopyData, copyControllers.update);

/**
 * Deletes a copy.
 * 
 * @route DELETE /:id
 * @description Deletes a copy and returns a success message.
 */
router.delete('/:id', validateCopyData, copyControllers.delete);

export default router;