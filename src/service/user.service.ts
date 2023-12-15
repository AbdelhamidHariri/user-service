import { query } from "../lib/db";
import { PostCreateUserReqBody } from "../routes/user.routes";
import { components } from "../schema/schema";

type UserDTO = components["schemas"]["UserDTO"];
export async function getAll() {
  return (
    await query(`
    SELECT * FROM users
  `)
  )?.rows as UserDTO[];
}

export async function create({ email, firstName, lastName, password }: PostCreateUserReqBody) {
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
}

export async function getWithId(id: string) {
  return (await query("SELECT * FROM users WHERE id = $1", [id]))?.rows[0] as UserDTO;
}

export async function deleteWithId(id: string) {
  await query("DELETE FROM users WHERE id = $1", [id]);
}

export async function update(id: string, userDTO: UserDTO) {
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
}
