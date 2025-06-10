import express from "express";
import { userControllers } from "../controllers/index.js";
import { checkTokenUser } from "../middlewares/check-user.js";
import authGuard from "../middlewares/auth-guard.js";
import { validateUserData } from "../middlewares/validate-user-data.js";

const router = express.Router();

// Rutas protegidas para los administradores.
router.post(
  "/",
  checkTokenUser,
  authGuard([1]),
  validateUserData,
  userControllers.create
);

router.put(
  "/:id",
  checkTokenUser,
  authGuard([1]),
  validateUserData,
  userControllers.update
);

// Ruta para obtener el usuario autenticado
router.get('/me', checkTokenUser, (req, res) => {
  console.log('req.user:', req.user);
  res.json(req.user);
});

router.delete(
  "/:id",
  checkTokenUser,
  authGuard(["admin"]),
  userControllers.delete
);

// Rutas públicas
router.get("/", userControllers.getAll);
router.get("/dni/:dni", userControllers.getByDni);
router.get("/role/:roleId", userControllers.getByRole);
router.get("/:id", userControllers.getById); 

export default router;
