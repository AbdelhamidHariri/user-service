import { Request, Response, Router } from "express";
import { components, paths } from "../schema/schema";
import * as userService from "../service/user.service";

export const userRouter = Router();
type GetAllUsersRes = paths["/users"]["get"]["responses"]["200"]["content"]["application/json"];
userRouter.get("/", async (_req: Request, res: Response<GetAllUsersRes>) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
});

export type PostCreateUserReqBody = paths["/users"]["post"]["requestBody"]["content"]["application/json"];
export type PostCreateUserRes = paths["/users"]["post"]["responses"]["201"]["content"]["application/json"];
userRouter.post("/", async (req: Request<{}, {}, PostCreateUserReqBody>, res: Response<PostCreateUserRes>) => {
  const user = await userService.create(req.body);
  return res.status(201).send(user);
});

export type GetUserParams = paths["/users/{id}"]["get"]["parameters"]["path"];
export type GetUserWithIdRes = paths["/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
userRouter.get("/:id", async (req: Request<GetUserParams>, res: Response<GetUserWithIdRes>) => {
  const user = await userService.getWithId(req.params.id);
  return res.status(200).json(user);
});

export type DeleteUserParams = paths["/users/{id}"]["delete"]["parameters"]["path"];
userRouter.delete("/:id", async (req: Request<DeleteUserParams>, res: Response) => {
  await userService.deleteWithId(req.params.id);
  res.status(204).send();
});

export type PutUserParams = paths["/users/{id}"]["put"]["parameters"]["path"];
export type PutUserRes = paths["/users/{id}"]["put"]["responses"]["201"]["content"]["application/json"];
export type PutUserReqBody = paths["/users/{id}"]["put"]["requestBody"]["content"]["application/json"];
userRouter.put("/:id", async (req: Request<PutUserParams, {}, PutUserReqBody>, res: Response<PutUserRes>) => {
  const user = await userService.update(req.params.id, req.body);
  res.status(201).json(user);
});
