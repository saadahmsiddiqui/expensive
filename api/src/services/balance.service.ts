import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Currency } from '@prisma/client';
import { CurrencyBalance } from '../interfaces/balances';

@Injectable()
export class BalanceService {
  constructor(private prismaService: PrismaService) { }

  async getCurrencyBalance(userId: string) {
    const expenses = await this.prismaService.$queryRaw<
      Array<{ id: string; sum: number }>
    >`SELECT c."id", SUM(e.amount) FROM "Expense" e JOIN "Currency" c ON c."id"=e."currencyId" WHERE e."createdBy"=${userId} GROUP BY c."id"`;

    const income = await this.prismaService.$queryRaw<
      Array<{ id: string; sum: number }>
    >`SELECT c."id", SUM(i.amount) FROM "Income" i JOIN "Currency" c ON c."id"=i."currencyId" WHERE i."createdBy" = ${userId} GROUP BY c."id"`;

    let currencyIds = new Set<string>();

    let expensesMap = expenses.reduce((agg: Map<string, number>, curr: { name: string; id: string, sum: number }) => {
      agg.set(curr.id, curr.sum);
      currencyIds.add(curr.id);
      return agg;
    }, new Map());

    let incomeMap = income.reduce((agg: Map<string, number>, curr: { id: string, sum: number }) => {
      agg.set(curr.id, curr.sum);
      return agg;
    }, new Map());

    let currencies = await this.prismaService.currency.findMany({ where: { id: { in: Array.from(currencyIds.values()) } } });

    let currenciesMap = currencies.reduce((agg, curr) => {
      agg.set(curr.id, curr);
      return agg;
    }, new Map<string, Currency>());

    let response: Array<CurrencyBalance> = [];

    currencyIds.forEach((id) => {
      const totalExpenses = expensesMap.get(id) ?? 0;
      const totalIncome = incomeMap.get(id) ?? 0;
      response.push({ balance: totalIncome - totalExpenses, ...currenciesMap.get(id)});
    });

    return response;
  }
}