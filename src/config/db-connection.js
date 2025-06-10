import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import config from "./index.js";

export const db = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "mysql",
    logging: false,
    dialectModule: mysql2,
  }
);

export const initMySQLDB = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: false });
  } catch (error) {
    throw new Error(error);
  }
};
