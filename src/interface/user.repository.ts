import { UserDTO, UserInputDTO } from "./user.types";

export interface UserRepository {
  create(userDTO: UserInputDTO): Promise<UserDTO>;
  getAll(): Promise<UserDTO[]>;
  getWithId(id: string): Promise<UserDTO>;
  update(id: string, userDTO: UserDTO): Promise<UserDTO>;
  deleteWithId(id: string): Promise<void>;
}
