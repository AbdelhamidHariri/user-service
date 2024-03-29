import { hashPassword, validateEmail, validatePassword } from "../controllers/user.controller";
import { UserRepository } from "../interface/user.repository";
import { UserDTO, UserInputDTO } from "../interface/user.types";
import { API_ERROR } from "../lib/api.error";
import { USER_NOT_FOUND } from "../schema/http-errors";

export async function getAll(repo: UserRepository) {
  return await repo.getAll();
}

export async function getWithId(repo: UserRepository, id: string) {
  const user = await repo.getWithId(id);
  if (!user) throw new API_ERROR(USER_NOT_FOUND);
  return user;
}

export async function create(repo: UserRepository, user: UserInputDTO) {
  validateEmail(user.email);
  validatePassword(user.password);
  const { salt, hash } = hashPassword(user.password);
  return await repo.create({ ...user, password: hash, salt });
}

export async function update(repo: UserRepository, user: UserDTO, id: string) {
  return await repo.update(id, user);
}

export async function deleteWithId(repo: UserRepository, id: string) {
  await repo.deleteWithId(id);
}
