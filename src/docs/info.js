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
        url: `http://localhost:${config.API_PORT}`,
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
