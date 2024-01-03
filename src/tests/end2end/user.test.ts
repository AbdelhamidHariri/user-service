import request from "supertest";
import { app, server } from "../..";
import { userRepository } from "../../repositories/user.db";
import { query } from "../../lib/db";

const truncateUserTable = async () => {
  await query("TRUNCATE TABLE users");
};

describe("Test user endpoins", () => {
  const repo = userRepository();

  beforeEach(async () => {
    await truncateUserTable();
  });

  afterAll(() => {
    server.close();
  });

  test("GET /users", async () => {
    const user = {
      email: "test@test.com",
      password: "password123",
      firstName: "testFirstName",
      lastName: "testLastName",
    };
    await repo.create(user);
    const response = await request(app).get("/users");
    expect(response.body.length).toBe(1);
    expect(response.body[0].email).toEqual(user.email);
    expect(response.body[0].firstName).toEqual(user.firstName);
    expect(response.body[0].lastName).toEqual(user.lastName);
  });
});
