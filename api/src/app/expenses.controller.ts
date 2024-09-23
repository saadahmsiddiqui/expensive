import { Controller, Get, Param, Post } from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from '../interfaces/dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('create')
  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Get('by/:creatorId')
  async getExpensesByCreator(
    @Param() params: { creatorId: string }
  ): Promise<Expense[]> {
    return this.expensesService.getExpenses(params.creatorId);
  }
}
