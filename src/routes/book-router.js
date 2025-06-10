/**
 * Book Router
 * 
 * Handles book-related routes.
 */

import express from "express";
import { bookControllers } from "../controllers/index.js";
import { checkTokenUser } from "../middlewares/check-user.js";
import authGuard from "../middlewares/auth-guard.js";
import { validateBookData } from "../middlewares/validate-book-data.js";

const router = express.Router();

/**
 * Protected routes for administrators (POST, PUT, DELETE)
 */

/**
 * Creates a new book.
 * 
 * @route POST /
 * @description Creates a new book and returns its ID.
 * @access admin
 */
router.post(
  "/",
  checkTokenUser,
  authGuard(["admin"]),
  validateBookData,
  bookControllers.create
);

/**
 * Updates an existing book.
 * 
 * @route PUT /:id
 * @description Updates an existing book and returns its updated data.
 * @access admin
 */
router.put(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  validateBookData,
  bookControllers.update
);

/**
 * Deletes a book.
 * 
 * @route DELETE /:id
 * @description Deletes a book and returns a success message.
 * @access admin
 */
router.delete(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  bookControllers.delete
);

/**
 * Public routes (GET)
 */
/**
 * Retrieves all books.
 * 
 * @route GET /
 * @description Retrieves a list of all books.
 */
router.get("/", bookControllers.getAll);

/**
 * Searches for books.
 * 
 * @route GET /search
 * @description Searches for books by keyword.
 */
router.get("/search", bookControllers.search);

/**
 * Retrieves books by category.
 * 
 * @route GET /category/:categoryId
 * @description Retrieves a list of books by category ID.
 */
router.get("/category/:categoryId", bookControllers.getByCategory);

/**
 * Retrieves a book by ID.
 * 
 * @route GET /:id
 * @description Retrieves a book by ID.
 */
router.get("/:id", bookControllers.getById);

export default router;
