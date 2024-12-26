import { SecureApi } from "./secureApi";

export interface Expense {
  currencyId: string;
  categoryId: string;
  amount: number;
  note: string;
  id: string;
  createdOn: string;
  createdBy: string;
}

export class Expenses extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = "expenses";
  }

  create(amount: number, note: string, currencyId: string, categoryId: string) {
    const body = JSON.stringify({
      data: { amount, note, currencyId, categoryId, recordType: "Expense" },
    });

    return super.buildCall(
      `${this.baseUrl}/${this.controller}/create`,
      "POST",
      body,
      this.getAuthorizationHeader()
    );
  }

  get() {
    return super.buildCall<Array<Expense>>(
      `${this.baseUrl}/${this.controller}/my`,
      "GET",
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
