import { Sequelize } from "sequelize";

export const db = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //   logging: false,
});

export const initMySQLDB = async () => {
  try {
    await db.authenticate();
    // await db.sync({ force: false })  //true elimina los registros de las tablas
  } catch (error) {
    throw new Error(error);
  }
};
