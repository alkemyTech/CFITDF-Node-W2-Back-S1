import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";
import routes from "./routes/index.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { initMySQLDB } from "./config/db-connection.js";
import { info } from "./docs/info.js";
const specs = swaggerJSDoc(info);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

initMySQLDB()
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.error(error));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", routes);
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
