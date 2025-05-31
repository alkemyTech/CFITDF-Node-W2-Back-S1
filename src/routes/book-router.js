import express from "express";
import { bookControllers } from "../controllers/index.js";
import { checkTokenUser } from "../middlewares/check-user.js";
import authGuard from "../middlewares/auth-guard.js";
import { validateBookData } from "../middlewares/validate-book-data.js";

const router = express.Router();

// Rutas protegidas para administradores (POST, PUT, DELETE)
router.post(
  "/",
  checkTokenUser,
  authGuard(["admin"]),
  validateBookData,
  bookControllers.create
);

router.put(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  validateBookData,
  bookControllers.update
);

router.delete(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  bookControllers.delete
);

// Rutas públicas (GET)
router.get("/", bookControllers.getAll);
router.get("/search", bookControllers.search);
router.get("/category/:categoryId", bookControllers.getByCategory);
router.get("/:id", bookControllers.getById);

export default router;
