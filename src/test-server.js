import express from "express";
import { validateBookData } from "./middlewares/validate-book-data.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { validateUserData } from "./middlewares/validate-user-data.js";

const app = express();
app.use(express.json());

app.post("/prueba-libros", validateBookData, (req, res) => {
  res.status(200).json({ mensaje: "Middleware funcionando. Libro válido" });
});

app.post("/prueba-usuarios", validateUserData, (req, res) => {
  res.status(200).json({ mensaje: "Middleware funcionando. Usuario válido" });
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log("Servidor de prueba activo en http://localhost:3001");
});


