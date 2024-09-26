export class BaseExpensiveApi {
  baseUrl: string;
  accessToken?: string;
  headers = {
    'Content-type': 'application/json',
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  storeAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAuthorizationHeader() {
    return { Authorization: `bearer ${localStorage.getItem('accessToken')}` };
  }

  buildCall(
    endpoint: string,
    method: 'GET' | 'POST',
    body: string | Buffer | null | undefined,
    headers?: Record<string, string>
  ) {
    return fetch(endpoint, {
      body,
      method,
      headers: {
        ...this.headers,
        ...headers,
      },
    }).then((response) => response.json());
  }
}
