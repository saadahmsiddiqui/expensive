import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class BalanceService {
  constructor(private prismaService: PrismaService) {}

  async getCurrencyBalance(userId: string) {
    const expenses = await this.prismaService.$queryRaw<
      Array<{ id: string; sum: number }>
    >`SELECT c."id", SUM(e.amount) FROM "Expense" e JOIN "Currency" c ON c."id"=e."currencyId" WHERE e."createdBy"=${userId} GROUP BY c."id"`;

    const income = await this.prismaService.$queryRaw<
      Array<{ id: string; sum: number }>
    >`SELECT c."id", SUM(i.amount) FROM "Income" i JOIN "Currency" c ON c."id"=i."currencyId" WHERE i."createdBy" = ${userId} GROUP BY c."id"`;

    let currencyIds = new Set<string>();
    let balances = new Map<string, number>();

    let expensesMap = expenses.reduce((agg, curr) => {
      agg.set(curr.id, curr.sum);
      currencyIds.add(curr.id);
      return agg;
    }, new Map());

    let incomeMap = income.reduce((agg, curr) => {
      agg.set(curr.id, curr.sum);
      return agg;
    }, new Map());

    currencyIds.forEach((id) => {
      const totalExpenses = expensesMap.get(id) ?? 0;
      const totalIncome = incomeMap.get(id) ?? 0;
      balances.set(id, totalIncome - totalExpenses);
    });

    return Array.from(balances.entries());
  }
}
