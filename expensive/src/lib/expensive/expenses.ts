import { SecureApi } from './secureApi';

export class Expenses extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
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
