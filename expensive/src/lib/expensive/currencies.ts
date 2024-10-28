import { SecureApi } from './secureApi';

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  createdBy: string;
  createdOn: string;
}

export class Currencies extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = 'currencies';
  }

  create(name: string, symbol: string) {
    const body = JSON.stringify({ data: { name, symbol } });
    return super.buildCall(
      `${this.baseUrl}/${this.controller}/create`,
      'POST',
      body,
      this.getAuthorizationHeader()
    );
  }

  get() {
    return super.buildCall<Array<Currency>>(
      `${this.baseUrl}/${this.controller}/my`,
      'GET',
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
