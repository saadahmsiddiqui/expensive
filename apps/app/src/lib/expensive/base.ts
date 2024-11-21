export class BaseExpensiveApi {
  baseUrl: string;
  accessToken?: string;
  headers = {
    'Content-type': 'application/json',
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  buildCall<T>(
    endpoint: string,
    method: 'GET' | 'POST',
    body: string | Buffer | null | undefined,
    headers?: Record<string, string>
  ): Promise<T> {
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
