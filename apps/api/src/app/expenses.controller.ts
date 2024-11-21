import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDto } from '../interfaces/dto';
import { AuthorizedRequest } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createExpense(
    @Req() request: AuthorizedRequest,
    @Body() requestBody: CreateExpenseDto,
  ): Promise<Expense> {
    requestBody.data.createdBy = request.auth.userId;
    return this.expensesService.createExpense(requestBody);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getExpensesByCreator(
    @Req() request: AuthorizedRequest,
  ): Promise<Expense[]> {
    return this.expensesService.getExpenses(request.auth.userId);
  }

  @UseGuards(AuthGuard)
  @Get('top')
  async getTopExpenses(@Req() request: AuthorizedRequest) {
    return this.expensesService.getTopExpenses(request.auth.userId);
  }
}
