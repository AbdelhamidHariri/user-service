import { Request, Response, Router } from "express";
import * as userService from "../service/user.service";

export const userRouter = Router();
/**
 * @openapi
 * /:
 *  get:
 *    summary: Get a list of users
 *    description: Retrieve a list of user entities.
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#components/schemas/error'
 */
userRouter.get("/", async (req: Request, res: Response) => {
  const users = await userService.getUsers();
});

/**
 * @openapi
 * /{id}:
 *   get:
 *   	summary: Get a user by id
 *   	description: Retrieve a single user by id.
 *   	parameters:
 *   	- in: path
 *     	name: userId
 *				schema:
 *       		type: integer
 *         	required: true
 *    responses:
 *     	200:
 *       	description: Successful response
 *       	content:
 *         	application/json:
 *            schema:
 *             	type: object
 *             	items:
 *               	$ref: '#/components/schemas/User'
 *      500:
 *       	description: Internal Server Error
 *       	content:
 *         	application/json:
 *           	schema:
 *              $ref: '#components/schemas/error'
 */
userRouter.get(":id", async (req: Request, res: Response) => {});
userRouter.post("/");
userRouter.delete("/:id");
userRouter.put("/:id");
