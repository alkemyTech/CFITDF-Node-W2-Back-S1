import { db } from "../config/db-connection.js";
import { DataTypes } from "sequelize";

export const CopyModel = db.define(
    "Ejemplares",
    {
        id_ejemplar: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_libro: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
  },
  {
    timestamps: false
    }
)