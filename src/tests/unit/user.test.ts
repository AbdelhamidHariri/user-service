import { validateEmail, validatePassword } from "../../controllers/user.controller";
import { API_ERROR } from "../../lib/api.error";
import { USER_NOT_FOUND } from "../../schema/http-errors";
import { create, getWithId } from "../../service/user.service";
import { user } from "../fixtures/user.fixture";

describe("User service", () => {
  const repo = {
    getWithId: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    deleteWithId: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getWithId: throw "user not found" given an id', async () => {
    repo.getWithId.mockResolvedValue(null);
    const id = "FAKEID";
    try {
      await getWithId(repo, id);
    } catch (error) {
      expect(error).toBeInstanceOf(API_ERROR);
      if (error instanceof API_ERROR) expect(error.message).toEqual(USER_NOT_FOUND.message);
    }
    expect(repo.getWithId).toHaveBeenCalledWith(id);
    expect(repo.getWithId).toHaveBeenCalledTimes(1);
  });

  test("getWithId: returns the user with the given id", async () => {
    repo.getWithId.mockResolvedValue(user);
    const id = "123123";
    const result = await getWithId(repo, id);
    expect(result).toEqual(user);
    expect(repo.getWithId).toHaveBeenCalledTimes(1);
    expect(repo.getWithId).toHaveBeenCalledWith(id);
  });

  test("create: creates a user", async () => {
    const userToCreate = {
      email: "test@test.com",
      password: "password123",
      firstName: "test",
      lastName: "test",
    };
    repo.create.mockResolvedValue(userToCreate);
    const result = await create(repo, userToCreate);
    expect(result).toEqual(userToCreate);
  });
});
