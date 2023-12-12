import { Router } from "express";

export const userRouter = Router();
userRouter.get("/");
userRouter.get(":id");
userRouter.post("/");
userRouter.delete("/:id");
userRouter.put("/:id");
