import { RecordType } from '@prisma/client';

export interface CreateCategoryDto {
  data: {
    name: string;
    icon: string;
    createdBy: string;
  };
}

export interface CreateCurrencyDto {
  data: {
    name: string;
    symbol: string;
    createdBy: string;
  };
}

export interface CreateExpenseDto {
  data: {
    amount: number;
    note: string;
    currencyId: string;
    categoryId: string;
    createdBy: string;
    recordType: RecordType;
  };
}

export interface CreateUserDto {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
}

export interface CreateIncomeDto {
  data: {
    amount: number;
    note: string;
    currencyId: string;
    categoryId: string;
    createdBy: string;
    recordType: RecordType;
  };
}
