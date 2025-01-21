export class BaseExpensiveApi {
  baseUrl: string;
  accessToken?: string;
  headers = {
    "Content-type": "application/json",
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  buildCall<T>(
    endpoint: string,
    method: "GET" | "POST",
    body: string | Buffer | null | undefined,
    headers?: Record<string, string>
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(endpoint, {
          body,
          method,
          headers: {
            ...this.headers,
            ...headers,
          },
        });

        if (response.ok) {
          return resolve(response.json());
        }

        const errorBody = await response.json();
        const errorMessage =
          "message" in errorBody
            ? errorBody.message
            : `API Call Error ${JSON.stringify(errorBody)}`;
        throw new Error(errorMessage);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
