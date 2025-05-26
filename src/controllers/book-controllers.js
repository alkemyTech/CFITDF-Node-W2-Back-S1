import CustomError from "../utils/custom-error.js";
import { successMessages, errorMessages } from "../utils/status-messages.js";
import { BookService } from "../services/book-services.js";

export class BookControllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const books = await this.service.getAll();
            res.status(200).json(books);
        } catch (error) {
            next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
        }
    }

    getById = async (req, res, next) => {
        try {
            const book = await this.service.getById(req.params.id);
            if (!book) {
                throw new CustomError(errorMessages.NOT_FOUND, 404);
            }
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            // Validación de datos 
            const newBook = await this.service.create(req.body);
            res.status(201).json({
                message: successMessages.CREATED,
                data: newBook
            });
        } catch (error) {
            next(new CustomError(
                error.name === "SequelizeValidationError" 
                    ? "Datos de libro inválidos" 
                    : errorMessages.ERROR_CREATE, 
                400
            ));
        }
    }

    update = async (req, res, next) => {
        try {
            const updatedBook = await this.service.update(req.params.id, req.body);
            if (!updatedBook) {
                throw new CustomError(errorMessages.NOT_FOUND, 404);
            }
            res.status(200).json({
                message: successMessages.UPDATED,
                data: updatedBook
            });
        } catch (error) {
            next(new CustomError(
                error.name === "SequelizeValidationError" 
                    ? "Datos de libro inválidos" 
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
            next(new CustomError(errorMessages.ERROR_DELETE, 500));
        }
    }

    search = async (req, res, next) => {
        try {
            const { query } = req.query;
            if (!query) {
                throw new CustomError("Parámetro de búsqueda requerido", 400);
            }
            const books = await this.service.search(query);
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    getByCategory = async (req, res, next) => {
        try {
            const books = await this.service.getByCategory(req.params.categoryId);
            res.status(200).json(books);
        } catch (error) {
            next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
        }
    }
}