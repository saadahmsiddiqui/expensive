import { BaseExpensiveApi } from './base';

export class Expenses extends BaseExpensiveApi {
  accessToken?: string;
  controller: string;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.controller = 'expenses';
  }

  create(amount: number, note: string, currencyId: string, categoryId: string) {
    const body = JSON.stringify({
      data: { amount, note, currencyId, categoryId },
    });

    return super.buildCall(
      `${this.baseUrl}/${this.controller}/create`,
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
