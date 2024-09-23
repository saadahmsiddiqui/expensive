import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from '../interfaces/dto';

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const newExpense = await this.prismaService.expense.create(
      createExpenseDto
    );
    return newExpense;
  }

  async getExpenses(userId: string): Promise<Expense[]> {
    return this.prismaService.expense.findMany({
      where: {
        createdBy: userId,
      },
      include: {
        Currency: true,
        Category: true,
      },
    });
  }
}
