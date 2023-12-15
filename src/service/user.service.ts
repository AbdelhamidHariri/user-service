import { query } from "../lib/db";
import { PostCreateUserReqBody } from "../routes/user.routes";
import { components } from "../schema/schema";

type User = components["schemas"]["User"];
export async function getAllUsers() {
  return (
    await query(`
    SELECT * FROM users
  `)
  )?.rows as User[];
}

export async function createUser({ email, firstName, lastName, password, tcAgreed }: PostCreateUserReqBody) {
  return (
    await query(
      `
    INSERT INTO
    users
    (
      email,
      first_name,
      last_name,
      password,
    )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
      )
    RETURNING *
  `,
      [email, firstName, lastName, password]
    )
  )?.rows[0] as User;
}
