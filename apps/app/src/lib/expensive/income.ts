import { SecureApi } from "./secureApi";

export interface Income {
  id: string;
  createdOn: string;
  amount: string;
  note: string;
  currencyId: string;
  categoryId: string;
  createdBy: string;
  recordType: "Income" | "Expense";
}

export class Income extends SecureApi {
  controller: string;

  constructor(baseUrl: string, accessToken: string) {
    super(baseUrl, accessToken);
    this.controller = "income";
  }

  create(amount: number, note: string, currencyId: string, categoryId: string) {
    const body = JSON.stringify({
      data: { amount, note, currencyId, categoryId, recordType: "Income" },
    });

    return super.buildCall(
      `${this.baseUrl}/${this.controller}/create`,
      "POST",
      body,
      this.getAuthorizationHeader()
    );
  }

  get() {
    return super.buildCall<Array<Income>>(
      `${this.baseUrl}/${this.controller}/my`,
      "GET",
      undefined,
      this.getAuthorizationHeader()
    );
  }
}
