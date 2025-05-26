import { db } from "../config/db-connection.js";
import { DataTypes } from "sequelize";

export const BookModel = db.define(
    'Libros',
    {
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        editorial: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        disponible: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);