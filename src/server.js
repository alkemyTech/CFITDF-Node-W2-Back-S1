import express from "express";
import config from "./config/index.js";

import { initMySQLDB } from "./config/db-connection.js";

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initMySQLDB()
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.error(error));

import './models/index.js'; // importa todas las relaciones SIN causar ciclo

import routes from './routes/index.js';
app.use('/', routes);

import errorHandler from './middlewares/error-handler.js'; 
app.use(errorHandler); 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



