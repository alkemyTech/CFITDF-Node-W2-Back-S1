import { db } from "../config/db-connection.js";
import { DataTypes } from "sequelize";

export const LoanModel = db.define(
    'Prestamos',
    {
        id_prestamo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_ejemplar: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        creacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        devolucion: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
);