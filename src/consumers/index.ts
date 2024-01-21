import { createUser } from "./handlers/user.handler";
import { USER_EVENTS } from "./queue.events";

export const handlers = {
  [USER_EVENTS.CREATE]: createUser,
};
