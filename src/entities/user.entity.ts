/**
 *	@openapi
 *	components:
 *	  schemas:
 *      User:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          rememberMe:
 *            type: boolean
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          tcAgreed:
 *            type: boolean
 *          firstSignOn:
 *            type: boolean
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 */
export class User {
  constructor(
    private email: string,
    private password: string,
    private firstName: string,
    private lastName: string,
    private tcAgreed: boolean,
    private firstSignOn: boolean,
    private createdAt: Date,
    private updatedAt: Date
  ) {}
}
