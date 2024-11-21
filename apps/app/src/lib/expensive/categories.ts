import { SecureApi } from './secureApi';

export interface Category {
  name: string;
  id: string;
  createdBy: string;
  createdOn: string;
}

export class Categories extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = 'categories';
  }

  create(name: string, icon: string) {
    const body = JSON.stringify({ data: { name, icon } });
    return super.buildCall(
      `${this.baseUrl}/${this.controller}/create`,
      'POST',
      body,
      this.getAuthorizationHeader()
    );
  }

  get() {
    return super.buildCall<Array<Category>>(
      `${this.baseUrl}/${this.controller}/my`,
      'GET',
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
