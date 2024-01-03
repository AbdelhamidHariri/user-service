import { Request, Response, Router } from "express";
import { paths } from "../schema/schema";
import * as userService from "../service/user.service";
import { userRepository } from "../repositories/user.db";
import { errorHandler } from "../lib/errorHandler";
import newrelic from "newrelic";

export const userRouter = Router();
const repo = userRepository();
type GetAllUsersRes = paths["/users"]["get"]["responses"]["200"]["content"]["application/json"];
userRouter.get(
  "/",
  errorHandler(async (req: Request, res: Response<GetAllUsersRes>) => {
    const users = await userService.getAll(repo);
    req.log.info("something");
    res.status(200).json(users);
  })
);

export type PostCreateUserReqBody = paths["/users"]["post"]["requestBody"]["content"]["application/json"];
export type PostCreateUserRes = paths["/users"]["post"]["responses"]["201"]["content"]["application/json"];
userRouter.post(
  "/",
  errorHandler(async (req: Request<{}, {}, PostCreateUserReqBody>, res: Response<PostCreateUserRes>) => {
    const user = await userService.create(repo, req.body);
    res.status(201).send(user);
  })
);

export type GetUserParams = paths["/users/{id}"]["get"]["parameters"]["path"];
export type GetUserWithIdRes = paths["/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
userRouter.get(
  "/:id",
  errorHandler(async (req: Request<GetUserParams>, res: Response<GetUserWithIdRes>) => {
    const user = await userService.getWithId(repo, req.params.id);
    res.status(200).json({ ...user });
  })
);

export type DeleteUserParams = paths["/users/{id}"]["delete"]["parameters"]["path"];
userRouter.delete(
  "/:id",
  errorHandler(async (req: Request<DeleteUserParams>, res: Response) => {
    await userService.deleteWithId(repo, req.params.id);
    res.status(204).send();
  })
);

export type PutUserParams = paths["/users/{id}"]["put"]["parameters"]["path"];
export type PutUserRes = paths["/users/{id}"]["put"]["responses"]["201"]["content"]["application/json"];
export type PutUserReqBody = paths["/users/{id}"]["put"]["requestBody"]["content"]["application/json"];
userRouter.put(
  "/:id",
  errorHandler(async (req: Request<PutUserParams, {}, PutUserReqBody>, res: Response<PutUserRes>) => {
    const user = await userService.update(repo, req.body, req.params.id);
    res.status(201).json(user);
  })
);
