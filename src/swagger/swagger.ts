import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as OpenApiValidator from "express-openapi-validator";

export const openAPISpecification = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication service",
      version: "1.0.0",
    },
  },
  apis: ["src/components/*.ts", "src/routes/*.ts", "src/error/error.ts"],
});

export function initSwagger(app: Application) {
  app.get("/openapi.json", (_req, res) => res.send(openAPISpecification));
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openAPISpecification));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: openAPISpecification as any,
      validateRequests: true,
      validateResponses: false,
    })
  );
}
