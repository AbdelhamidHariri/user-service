export const USER_NOT_FOUND = {
  statusCode: 400,
  code: "USER_NOT_FOUND",
  message: "User not found",
};

export const INVALID_EMAIL = {
  statusCode: 400,
  code: "INVALID_EMAIL",
  message: "Provided email is not a valid email",
};

export const INVALID_PASSWORD = {
  statusCode: 400,
  code: "INVALID_PASSWORD",
  message: "Provided password is not a valid password",
};

export const UNAUTHENTICATED = {
  statusCode: 401,
  code: "UNAUTHENTICATED",
  message: "User is not authenticated",
};
