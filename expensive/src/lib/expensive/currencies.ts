import { BaseExpensiveApi } from './base';

export class Currencies extends BaseExpensiveApi {
  accessToken?: string;
  controller: string;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.controller = 'currencies';
  }

  create(name: string, symbol: string) {
    const body = JSON.stringify({ data: { name, symbol } });
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
