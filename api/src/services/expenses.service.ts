import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Expense } from '@prisma/client';

interface CreateExpenseDto {
  data: {
    amount: number;
    note: string;
    currencyId: string;
    categoryId: string;
    createdBy: string;
  };
}

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const newExpense = await this.prismaService.expense.create(
      createExpenseDto
    );
    return newExpense;
  }
}
