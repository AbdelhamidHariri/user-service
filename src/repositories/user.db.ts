import { UserRepository } from "../interface/user.repository";
import { UserDTO, UserInputDTO } from "../interface/user.types";
import { query } from "../lib/db";

export function userRepository(): UserRepository {
  const getAll = async () => {
    return (
      await query(`
    SELECT * FROM users
  `)
    )?.rows as UserDTO[];
  };

  const create = async ({ email, firstName, lastName, password }: UserInputDTO) => {
    return (
      await query(
        `
    INSERT INTO
    users
    (
      email,
      first_name,
      last_name,
      password
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING *
  `,
        [email, firstName, lastName, password]
      )
    )?.rows[0] as UserDTO;
  };

  const getWithId = async (id: string) => {
    return (await query("SELECT * FROM users WHERE id = $1;", [id]))?.rows[0] as UserDTO | undefined;
  };

  const deleteWithId = async (id: string) => {
    await query("DELETE FROM users WHERE id = $1", [id]);
  };

  const update = async (id: string, userDTO: UserDTO) => {
    return (
      await query(
        `
  UPDATE users
  SET
    email = $1,
    first_name = $2,
    last_name = $3,
    is_first_time_signin = $4
  WHERE id = $5
  RETURNING email, first_name, last_name, is_first_time_signin
  `,
        [...Object.values(userDTO), id]
      )
    )?.rows[0] as UserDTO;
  };

  return {
    create,
    deleteWithId,
    getAll,
    getWithId,
    update,
  };
}
