// Validación de usuarios.

export const validateUserData = (req, res, next) => {
  const { dni, nombres, apellidos, email, id_rol } = req.body;

  if (!dni || !nombres || !apellidos || !email || !id_rol) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  if (!Number.isInteger(dni) || dni < 1000000) {
    return res.status(400).json({ message: "El DNI debe ser un número válido." });
  }

  if (typeof nombres !== "string" || nombres.trim() === "") {
    return res.status(400).json({ message: "El nombre debe ser un texto válido." });
  }

  if (typeof apellidos !== "string" || apellidos.trim() === "") {
    return res.status(400).json({ message: "El apellido debe ser un texto válido." });
  }

  const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "El email no es válido." });
  }

  if (!Number.isInteger(id_rol)) {
    return res.status(400).json({ message: "El id del rol debe ser un número válido." });
  }

  next();
};
