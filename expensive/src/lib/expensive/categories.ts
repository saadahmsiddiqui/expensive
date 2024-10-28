import { BaseExpensiveApi } from './base';
import { SecureApi } from './secureApi';

export class Categories extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = 'categories';
  }

  create(name: string, icon: string) {
    const body = JSON.stringify({ data: { name, icon } });
    return super.buildCall(
      `${this.baseUrl}/${this.controller}`,
      'POST',
      body,
      this.getAuthorizationHeader()
    );
  }

  get() {
    return super.buildCall(
      `${this.baseUrl}/${this.controller}/my`,
      'GET',
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
