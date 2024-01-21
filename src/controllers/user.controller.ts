import { API_ERROR } from "../lib/api.error";
import { INVALID_EMAIL, INVALID_PASSWORD } from "../schema/http-errors";
import { emailSchema, passwordSchema } from "../schema/user.schema";
import crypto from "crypto";

export const validateEmail = (email: string) => {
  const isEmail = emailSchema.parse(email);
  if (!isEmail) {
    throw new API_ERROR(INVALID_EMAIL);
  }
};

export const validatePassword = (password: string) => {
  const isPassword = passwordSchema.parse(password);
  if (!isPassword) {
    throw new API_ERROR(INVALID_PASSWORD);
  }
};

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  return {
    salt,
    hash,
  };
};
