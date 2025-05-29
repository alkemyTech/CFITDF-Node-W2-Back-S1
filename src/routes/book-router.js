import express from "express";
import { bookControllers } from "../controllers/index.js";

const router = express.Router();

router.get("/", bookControllers.getAll);
router.get("/search", bookControllers.search);
router.get("/category/:categoryId", bookControllers.getByCategory);
router.get("/:id", bookControllers.getById);
router.post("/", bookControllers.create);
router.put("/:id", bookControllers.update);
router.delete("/:id", bookControllers.delete);

export default router;