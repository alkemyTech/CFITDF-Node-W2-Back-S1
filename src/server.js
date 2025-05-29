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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
