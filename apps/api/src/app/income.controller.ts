import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Income } from '@prisma/client';
import { CreateExpenseDto } from '../interfaces/dto';
import { AuthorizedRequest } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { IncomeService } from '../services/income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createIncome(
    @Req() request: AuthorizedRequest,
    @Body() requestBody: CreateExpenseDto,
  ): Promise<Income> {
    requestBody.data.createdBy = request.auth.userId;
    return this.incomeService.createIncome(requestBody);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getExpensesByCreator(
    @Req() request: AuthorizedRequest,
  ): Promise<Income[]> {
    return this.incomeService.getIncome(request.auth.userId);
  }
}
