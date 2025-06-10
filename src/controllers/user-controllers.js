import CustomError from "../utils/custom-error.js";
import { successMessages, errorMessages } from "../utils/status-messages.js";

export class UserControllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const users = await this.service.getAll();
            res.status(200).json(users);
        } catch (error) {
            next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
        }
    }

    getById = async (req, res, next) => {
        try {
            const user = await this.service.getById(req.params.id);
            if (!user) {
                throw new CustomError(errorMessages.NOT_FOUND, 404);
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    getByDni = async (req, res, next) => {
        try {
            const user = await this.service.getByDni(req.params.dni);
            if (!user) {
                throw new CustomError(errorMessages.NOT_FOUND, 404);
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            // Verificar DNI y mail
            const existeDni = await this.service.getByDni(req.body.dni);
            if (existeDni) {
                throw new CustomError("El DNI ya está registrado", 400);
            }

            const existeEmail = await this.service.getByEmail(req.body.email);
            if (existeEmail) {
                throw new CustomError("El email ya está registrado", 400);
            }

            const newUser = await this.service.create(req.body);
            res.status(201).json({
                message: successMessages.CREATED,
                data: newUser
            });
        } catch (error) {
            console.error('Error al crear usuario:', error); // 
            next(new CustomError(
                error.name === "SequelizeValidationError"
                ? "Datos de usuario inválidos"
                : errorMessages.ERROR_CREATE,
                400
            ));
        }
    }

    update = async (req, res, next) => {
        try {
            // Verificar que el usuario existe
            const user = await this.service.getById(req.params.id);
            if (!user) {
                throw new CustomError(errorMessages.NOT_FOUND, 404);
            }

            // Verificar que el nuevo email no esté en uso por otro usuario
            if (req.body.email && req.body.email !== user.email) {
                const existeEmail = await this.service.getByEmail(req.body.email);
                if (existeEmail) {
                    throw new CustomError("El email ya está en uso por otro usuario", 400);
                }
            }

            const updatedUser = await this.service.update(req.params.id, req.body);
            res.status(200).json({
                message: successMessages.UPDATED,
                data: updatedUser
            });
        } catch (error) {
            next(new CustomError(
                error.name === "SequelizeValidationError" 
                    ? "Datos de usuario inválidos" 
                    : errorMessages.ERROR_UPDATE, 
                400
            ));
        }
    }

    delete = async (req, res, next) => {
        try {
            const resultado = await this.service.delete(req.params.id);
            if (!resultado) {
                throw new CustomError(errorMessages.NOT_FOUND, 404);
            }
            res.status(200).json({ message: successMessages.DELETED });
        } catch (error) {
            next(new CustomError(errorMessages.ERROR_DELETE, 500));
        }
    }

    getByRole = async (req, res, next) => {
        try {
            const users = await this.service.getByRole(req.params.roleId);
            res.status(200).json(users);
        } catch (error) {
            next(new CustomError(errorMessages.INTERNAL_ERROR, 500));
        }
    }
}