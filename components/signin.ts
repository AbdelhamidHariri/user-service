/**
 *	@openapi
 *	components:
 *	  schemas:
 *      signin:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          rememberMe:
 *            type: boolean
 *      resetPassword:
 *        type: object
 *        required:
 *          - password
 *          - confirmPassword
 *        properties:
 *          password:
 *            type: string
 *          confirmPassword:
 *            type: string
 */
export class Signin {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  verify() {
    return this.email ? (this.password ? true : false) : false;
  }
}
