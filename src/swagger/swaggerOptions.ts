import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Music Player API",
      version: "1.0.0",
      description: "API documentation for the Music Player application",
    },
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [{ url: "http://localhost:2828" }],
  },
  apis: ["dist/routes/*.js"],
};
