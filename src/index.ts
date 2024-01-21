import express from "express";
import { initSwagger } from "./swagger/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";
import { userRouter } from "./routes/user.routes";
import { rabbitMQ } from "./lib/rabbitmq";
import { handlers } from "./consumers";
import { authenticate } from "./middlewares/auth.middlewar";

export let app = express();

const consumeHandlers = async () => {
  const messageBroker = await rabbitMQ();
  Object.entries(handlers).forEach(async ([key, value]) => {
    messageBroker.consume(key, value);
  });
};

consumeHandlers();

app.use(express.json());
initSwagger(app);

authenticate(app);
app.use("/users", userRouter);

errorMiddleware(app);
export const server = app.listen(process.env.SERVICE_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.SERVICE_PORT}`);
  console.log(`Swagger is running at http://localhost:${process.env.SERVICE_PORT}/swagger`);
  console.log(`OpenAPI specification is at http://localhost:${process.env.SERVICE_PORT}/openapi.json `);
});

server;
