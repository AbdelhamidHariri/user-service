import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import * as OpenApiValidator from "express-openapi-validator";
import openAPISpecification from "../schema/openapi.specification.json";

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
