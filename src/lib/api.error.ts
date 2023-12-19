export class API_ERROR extends Error {
  readonly statusCode: number;
  readonly code: string;
  constructor(errorObject: { message: string; statusCode: number; code: string }) {
    super(errorObject.message);
    this.statusCode = errorObject.statusCode;
    this.code = errorObject.code;
  }
}
