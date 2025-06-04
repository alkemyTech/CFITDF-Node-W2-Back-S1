import express from "express";
import config from "./config/index.js";
import cors from "cors";
// import models from './models/index.js';
import errorHandler from "./middlewares/error-handler.js";
import routes from "./routes/index.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { initMySQLDB } from "./config/db-connection.js";
import { info } from "./docs/info.js";
const specs = swaggerJSDoc(info);

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

initMySQLDB()
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.error(error));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // Para pruebas