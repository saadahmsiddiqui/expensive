import { SecureApi } from './secureApi';

export class Balance extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = 'balance';
  }

  get() {
    return super.buildCall<Array<[string, number]>>(
      `${this.baseUrl}/${this.controller}/my`,
      'GET',
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
