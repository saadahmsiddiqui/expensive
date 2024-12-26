import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';
import { Records } from '@prisma/client';
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
  ): Promise<Records> {
    requestBody.data.createdBy = request.auth.userId;
    return this.expensesService.createExpense(requestBody);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getExpensesByCreator(
    @Req() request: AuthorizedRequest,
  ): Promise<Records[]> {
    return this.expensesService.getExpenses(request.auth.userId);
  }

  @UseGuards(AuthGuard)
  @Get('top')
  async getTopExpenses(@Req() request: AuthorizedRequest) {
    return this.expensesService.getTopExpenses(request.auth.userId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async removeRecord(@Param('id') id: string) {
    return this.expensesService.deleteRecord(id);
  }
}
