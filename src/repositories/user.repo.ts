import { User } from "../entities/user.entity";
import { query } from "../lib/db";
import { CoreRepo } from "./core.repo";

export class UserRepo implements CoreRepo<User> {
  constructor(private readonly db: typeof query) {}
  async getById(id: string): Promise<User> {}
  async getAll(): Promise<User> {}
  async delete(id: string): Promise<User> {}
}
