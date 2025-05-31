const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Error interno del servidor";

  const response = { message };

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  if (error.name === "SequelizeValidationError") {
    response.message = error.errors.map(e => e.message);
    res.status(400).json(response);
    return;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    response.message = "Ya existe un registro con ese dato único.";
    res.status(400).json(response);
    return;
  }

  res.status(status).json(response);
};

export default errorHandler;