import { UserRepository } from "../interface/user.repository";
import { UserDTO, UserInputDTO } from "../interface/user.types";

export async function getAll(repo: UserRepository) {
  return await repo.getAll();
}

export async function getWithId(repo: UserRepository, id: string) {
  return await repo.getWithId(id);
}

export async function create(repo: UserRepository, user: UserInputDTO) {
  return await repo.create(user);
}

export async function update(repo: UserRepository, user: UserDTO, id: string) {
  return await repo.update(id, user);
}

export async function deleteWithId(repo: UserRepository, id: string) {
  await repo.deleteWithId(id);
}
