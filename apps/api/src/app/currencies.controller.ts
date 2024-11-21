import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CurrenciesService } from '../services/currencies.service';
import { CreateCurrencyDto } from '../interfaces/dto';
import { Currency } from '@prisma/client';
import { AuthorizedRequest } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createCurrency(
    @Req() request: AuthorizedRequest,
    @Body() requestBody: CreateCurrencyDto
  ): Promise<Currency> {
    requestBody.data.createdBy = request.auth.userId;
    return this.currenciesService.createCurrency(requestBody);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getCurrenciesByCreator(
    @Req() request: AuthorizedRequest
  ): Promise<Currency[]> {
    return this.currenciesService.getCurrenciesByCreator(request.auth.userId);
  }
}
