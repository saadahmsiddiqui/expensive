import { BaseExpensiveApi } from './base';

export class Auth extends BaseExpensiveApi {
  controller: string;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.controller = 'auth';
  }

  login(email: string, password: string) {
    const body = JSON.stringify({ data: { email, password } });

    return super.buildCall<{ accessToken?: string }>(
      `${this.baseUrl}/${this.controller}/login`,
      'POST',
      body
    );
  }

  register(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const body = JSON.stringify({
      data: { email, firstName, lastName, password },
    });

    return super.buildCall(
      `${this.baseUrl}/${this.controller}/register`,
      'POST',
      body
    );
  }
}
