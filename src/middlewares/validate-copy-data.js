// Middleware para validar parámetros de ruta y body en las rutas de copias
// Se usa para asegurar que los datos recibidos sean del tipo y formato esperado antes de llegar al controlador

export const validateCopyData = (req, res, next) => {
  const { id, bookId } = req.params;
  const { estado } = req.body;

  // Validar que id y bookId sean numéricos si existen
  // Esto previene errores en la base de datos y asegura que los controladores reciban datos válidos
  if (id && !/^[0-9]+$/.test(id)) {
    return res.status(400).json({ message: "El id debe ser numérico" });
  }
  if (bookId && !/^[0-9]+$/.test(bookId)) {
    return res.status(400).json({ message: "El bookId debe ser numérico" });
  }

  // Validar campo de body (ejemplo: estado debe ser string si existe)
  // Esto ayuda a evitar errores de validación en la lógica de negocio
  if (estado && typeof estado !== "string") {
    return res.status(400).json({ message: "El estado debe ser un string" });
  }

  next();
};
