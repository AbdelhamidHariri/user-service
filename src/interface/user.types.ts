import { components } from "../schema/schema";

export type UserDTO = components["schemas"]["UserDTO"];
export type UserInputDTO = components["schemas"]["UserInput"];

export type CreateUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  salt: string;
  isFirstTimeSignin?: boolean | undefined;
};
