import CustomError from "../utils/custom-error.js";
import { successMessages, errorMessages } from "../utils/status-messages.js";

export class CopyControllers {
  constructor(service) {
    this.service = service;
  }

  getByBook = async (req, res, next) => {
    try {
      const copies = await this.service.getByBook(req.params.bookId);
      res.status(200).json(copies);
    } catch (error) {
      next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
    }
  }

  getAvailableCopies = async (req, res, next) => {
    try {
      const copias = await this.service.getAvailableCopies(req.params.bookId);
      res.status(200).json(copias);
    } catch (error) {
      next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
    }
  }

  getById = async (req, res, next) => {
    try {
      const copia = await this.service.getById(req.params.id);
      if (!copia) {
        throw new CustomError(errorMessages.NOT_FOUND, 404);
      }
      res.status(200).json(copy);
    } catch (error) {
      next(error);
    }
  }

  create = async (req, res, next) => {
    try {
      const newCopy = await this.service.create(req.body);
      res.status(201).json({
        message: successMessages.CREATED,
        data: newCopy
      });
    } catch (error) {
      next(new CustomError(
        error.name === "SequelizeValidationError" 
          ? "Datos de ejemplar inválidos" 
          : errorMessages.ERROR_CREATE, 
        400
      ));
    }
  }

  update = async (req, res, next) => {
    try {
      const updateCopy = await this.service.update(req.params.id, req.body);
      if (!updateCopy) {
        throw new CustomError(errorMessages.NOT_FOUND, 404);
      }
      res.status(200).json({
        message: successMessages.UPDATED,
        data: updateCopy
      });
    } catch (error) {
      next(new CustomError(
        error.name === "SequelizeValidationError" 
          ? "Datos de ejemplar inválidos" 
          : errorMessages.ERROR_UPDATE, 
        400
      ));
    }
  }

  delete = async (req, res, next) => {
    try {
      const result = await this.service.delete(req.params.id);
      if (!result) {
        throw new CustomError(errorMessages.NOT_FOUND, 404);
      }
      res.status(200).json({ message: successMessages.DELETED });
    } catch (error) {
      next(new CustomError(
        error.message.includes('No se puede eliminar') 
          ? error.message 
          : errorMessages.ERROR_DELETE,
        400
      ));
    }
  }
}