import { query } from "../lib/db";

export async function getUserById(id: string) {
  return await query("SELECT * FROM users WHERE id = $id", { id });
}

export async function createUser(username: string, password: string) {
  return await query("INSERT INTO users (username, password) VALUES ($broccoli, $password)", {
    broccoli: "asdsad",
    password: "asdasd",
  });
}

export async function getUsers() {
  return await query("SELECT * FROM users;", {});
}
