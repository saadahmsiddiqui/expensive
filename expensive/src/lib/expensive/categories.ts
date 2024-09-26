import { BaseExpensiveApi } from './base';

export class Categories extends BaseExpensiveApi {
  accessToken?: string;
  controller: string;

  constructor(baseUrl: string) {
    super(baseUrl);
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
