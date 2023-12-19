import "newrelic";
import express from "express";
import { initSwagger } from "./swagger/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";
import { userRouter } from "./routes/user.routes";
import pino from "pino-http";

const app = express();
const port = 3000;

app.use(pino());
app.use(express.json());
initSwagger(app);

app.use("/users", userRouter);

errorMiddleware(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger is running at http://localhost:${port}/swagger`);
  console.log(`OpenAPI specification is at http://localhost:${port}/openapi.json `);
});
