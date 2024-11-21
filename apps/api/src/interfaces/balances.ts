import { Currency } from '@prisma/client';
export interface CurrencyBalance extends Currency {
  balance: number;
}
