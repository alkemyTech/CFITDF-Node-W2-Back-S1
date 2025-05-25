// Validación de datos de los libros.

export const validateBookData = (req, res, next) => {
  const { titulo, isbn, editorial, autor, disponible, id_categoria } = req.body;

  if (!titulo || !isbn || !editorial || !autor || disponible === undefined || !id_categoria) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  if (typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ message: "El título debe ser un texto válido." });
  }

  if (typeof isbn !== "string" || isbn.trim().length < 10) {
    return res.status(400).json({ message: "El ISBN debe tener al menos 10 caracteres." });
  }

  if (typeof disponible !== "boolean") {
    return res.status(400).json({ message: "El campo 'disponible' debe ser verdadero o falso." });
  }

  if (isNaN(id_categoria)) {
    return res.status(400).json({ message: "El id de la categoría debe ser un número válido." });
  }

  next();
};
