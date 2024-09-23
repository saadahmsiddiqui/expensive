import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrenciesService } from '../services/currencies.service';
import { CreateCurrencyDto } from '../interfaces/dto';
import { Currency } from '@prisma/client';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post('create')
  async createCurrency(
    @Body() requestBody: CreateCurrencyDto
  ): Promise<Currency> {
    return this.currenciesService.createCurrency(requestBody);
  }

  @Get('by/:creatorId')
  async getCurrenciesByCreator(
    @Param() params: { creatorId: string }
  ): Promise<Currency[]> {
    return this.currenciesService.getCurrencies(params.creatorId);
  }
}
