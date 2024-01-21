import { userRepository } from "../../repositories/user.db";
import * as userService from "../../service/user.service";

export const createUser = async (msg: any) => {
  const userRepo = userRepository();
  const user = JSON.parse(msg);
  return await userService.create(userRepo, user);
};
