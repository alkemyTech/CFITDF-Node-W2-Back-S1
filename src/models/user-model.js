import { db } from "../config/db-connection.js";
import { DataTypes } from "sequelize";

export const UserModel = db.define(
    'Usuarios',
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

                id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        nombres: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        paranoid: true, // soft delete
        timestamps: true, // createdAt, updatedAt
    }
);