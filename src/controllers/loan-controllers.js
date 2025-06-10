import CustomError from "../utils/custom-error.js";
import { successMessages, errorMessages } from "../utils/status-messages.js";

export class LoanControllers {
  constructor(service) {
    this.service = service;
  }

  createLoan = async (req, res, next) => {
    try {
      const loan = await this.service.createLoan(req.body);
      res.status(201).json({
        message: "Préstamo registrado con éxito",
        data: loan
      });
    } catch (error) {
      next(new CustomError(
        error.message.includes('El ejemplar ya está prestado') 
          ? error.message 
          : errorMessages.ERROR_CREATE,
        400
      ));
    }
  }

  returnLoan = async (req, res, next) => {
    try {
      const loan = await this.service.returnLoan(req.params.id);
      res.status(200).json({
        message: "Libro devuelto con éxito",
        data: loan
      });
    } catch (error) {
      next(new CustomError(
        error.message.includes('no encontrado') || error.message.includes('ya fue devuelto')
          ? error.message 
          : errorMessages.ERROR_UPDATE,
        400
      ));
    }
  }

  getActiveLoans = async (req, res, next) => {
    try {
      const loans = await this.service.getActiveLoans();
      res.status(200).json(loans);
    } catch (error) {
      console.error('Error en getActiveLoans:', error);
      next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
    }
  }
  

  getUserLoans = async (req, res, next) => {
    try {
      const loans = await this.service.getUserLoans(req.params.userId);
      res.status(200).json(loans);
    } catch (error) {
      console.error('Error en getUserLoans:', error);
      next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
    }
  }

  getOverdueLoans = async (req, res, next) => {
    try {
      const loans = await this.service.getOverdueLoans();
      res.status(200).json(loans);
    } catch (error) {
        console.error('Error en getActiveLoans:', error);
        next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
      }
    }
  }
