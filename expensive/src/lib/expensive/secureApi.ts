import { BaseExpensiveApi } from './base';

export class SecureApi extends BaseExpensiveApi {
  accessToken: string;

  getAuthorizationHeader() {
    return { Authorization: `bearer ${this.accessToken}` };
  }

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl);
    this.accessToken = accessToken;
  }
}
