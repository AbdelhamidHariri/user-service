import { UserDTO, CreateUser } from "./user.types";

export interface UserRepository {
  create(userDTO: CreateUser): Promise<UserDTO>;
  getAll(): Promise<UserDTO[]>;
  getWithId(id: string): Promise<UserDTO | undefined>;
  update(id: string, userDTO: UserDTO): Promise<UserDTO>;
  deleteWithId(id: string): Promise<void>;
}
