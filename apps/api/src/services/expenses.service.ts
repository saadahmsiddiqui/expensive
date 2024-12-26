import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Records } from '@prisma/client';
import { CreateExpenseDto } from '../interfaces/dto';

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Records> {
    const newExpense =
      await this.prismaService.records.create(createExpenseDto);
    return newExpense;
  }

  async getExpenses(userId: string): Promise<Records[]> {
    return this.prismaService.records.findMany({
      where: {
        createdBy: userId,
        isDeleted: false,
        recordType: 'Expense',
      },
      include: {
        Currency: true,
        Category: true,
      },
    });
  }

  async getTopExpenses(userId: string): Promise<Records[]> {
    return this.prismaService.records.findMany({
      where: {
        createdBy: userId,
        isDeleted: false,
      },
      orderBy: {
        amount: 'desc',
        createdOn: 'desc',
      },
      take: 5,
    });
  }

  async deleteRecord(id: string) {
    return this.prismaService.records.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedOn: new Date(),
      },
    });
  }
}
