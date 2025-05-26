import { db } from "../config/db-connection.js";
import { DataTypes } from "sequelize";

export const CategoryModel = db.define(
    "Categorias",
    {
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
  },
  {
    timestamps: false
    }
)