import { Currency } from '../expensive/currencies';
import { SecureApi } from './secureApi';

export interface CurrencyBalance extends Currency {
  balance: number;
}

export class Balance extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = 'balance';
  }

  get() {
    return super.buildCall<Array<CurrencyBalance>>(
      `${this.baseUrl}/${this.controller}/my`,
      'GET',
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
