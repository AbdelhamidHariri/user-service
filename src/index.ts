import express from "express";
import { initSwagger } from "./swagger/swagger";
import { initErrorHandling } from "./error/error";
import { authRouter } from "./routes/user";

const app = express();
const port = 3000;

app.use(express.json());
initSwagger(app);
initErrorHandling(app);

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger is running at http://localhost:${port}/swagger`);
  console.log(`OpenAPI specification is at http://localhost:${port}/openapi.json `);
});
