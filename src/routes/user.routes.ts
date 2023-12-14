import { Request, Response, Router } from "express";
import { paths } from "../schema/schema";
import { createUser, getAllUsers } from "../service/user.service";

export const userRouter = Router();
type GetAllUsersRes = paths["/users"]["get"]["responses"]["200"]["content"]["application/json"];
userRouter.get("/", async (req: Request, res: Response<GetAllUsersRes>) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
});

export type PostCreateUserReqBody = paths["/users"]["post"]["requestBody"]["content"]["application/json"];
export type PostCreateUserRes = paths["/users"]["post"]["responses"]["201"]["content"]["application/json"];
userRouter.post("/", async (req: Request<{}, {}, PostCreateUserReqBody>, res: Response<PostCreateUserRes>) => {
  const user = await createUser(req.body);
  return res.status(201).send(user);
});

userRouter.get(":id", async (req: Request, res: Response) => {});
userRouter.delete("/:id", async (req: Request, res: Response) => {});
userRouter.put("/:id");
