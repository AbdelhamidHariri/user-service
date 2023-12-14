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
