import { Request, Response, Router } from "express";

export const authRouter = Router();

/**
 *  @openapi
 *  /signin:
 *    post:
 *      description: Resource for signing in and getting a session
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/signin'
 *      responses:
 *        201:
 *          description: Successfully signed in
 */
authRouter.post("/signin", (req: Request, res: Response) => {});

/**
 *  @openapi
 *  /signout:
 *    get:
 *      description: Resource to sign out and deleting session
 *      responses:
 *        204:
 *          description: The resource was deleted successfully.
 */
authRouter.get("/signout", () => {});

/**
 *  @openapi
 *  /verify:
 *    post:
 *      description: Resource to verify a six digit number
 *      responses:
 *        200:
 *          description: The six digit number is verified successfully
 *        409:
 *          description: The six digit number is invalid
 */
authRouter.post("/verify", () => {});

/**
 *  @openapi
 *  /resetpassword:
 *    post:
 *      description: Resource for resetting user password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/resetPassword'
 *      responses:
 *        201:
 *          description: Successfully reset user password
 */
authRouter.post("/resetpassword");
