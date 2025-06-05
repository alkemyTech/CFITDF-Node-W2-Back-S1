import { db } from "../config/db-connection.js";
import { DataTypes } from "sequelize";

export const RolModel = db.define(
    "Roles",
    {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nombre_rol: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
  },
  {
    timestamps: false
    }
)