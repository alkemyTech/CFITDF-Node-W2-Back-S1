import CustomError from "../utils/custom-error.js";
import { successMessages, errorMessages } from "../utils/status-messages.js";

export class RolControllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const roles = await this.service.getAll();
      res.status(200).json(roles);
    } catch (error) {
      next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
    }
  }

  getById = async (req, res, next) => {
    try {
      const rol = await this.service.getById(req.params.id);
      if (!rol) {
        throw new CustomError(errorMessages.NOT_FOUND, 404);
      }
      res.status(200).json(rol);
    } catch (error) {
      next(error);
    }
  }

  create = async (req, res, next) => {
    try {
      const newRol = await this.service.create(req.body);
      res.status(201).json({
        message: successMessages.CREATED,
        data: newRol
      });
    } catch (error) {
      next(new CustomError(
        error.name === "SequelizeValidationError" 
          ? "Datos de rol inválidos" 
          : errorMessages.ERROR_CREATE, 
        400
      ));
    }
  }

  update = async (req, res, next) => {
    try {
      const updatedRol = await this.service.update(req.params.id, req.body);
      if (!updatedRol) {
        throw new CustomError(errorMessages.NOT_FOUND, 404);
      }
      res.status(200).json({
        message: successMessages.UPDATED,
        data: updatedRol
      });
    } catch (error) {
      next(new CustomError(
        error.name === "SequelizeValidationError" 
          ? "Datos de rol inválidos" 
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