import dotenv from "dotenv";
// import 'dotenv/config'
dotenv.config();


// Define environment configuration
export default {
  APP_ENV: process.env.APP_ENV,
  PORT: process.env.SERVER_PORT || 3000,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
};
