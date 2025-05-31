import config from "../config/index.js";

export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Alke Biblioteca",
      version: "0.0.1",
      description: "API para gestionar Alke Biblioteca",
    },
    servers: [
      {
        url: `http://0.0.0.:${config.PORT}`,
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
