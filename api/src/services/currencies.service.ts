import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Currency } from '@prisma/client';
import { CreateCurrencyDto } from '../interfaces/dto';

@Injectable()
export class CurrenciesService {
  constructor(private prismaService: PrismaService) {}

  async createCurrency(
    createCategoryDto: CreateCurrencyDto
  ): Promise<Currency> {
    const newCurrency = await this.prismaService.currency.create(
      createCategoryDto
    );
    return newCurrency;
  }

  async getCurrenciesByCreator(creatorId: string): Promise<Currency[]> {
    return this.prismaService.currency.findMany({
      where: {
        createdBy: creatorId,
      },
    });
  }

  async getCurrencies(): Promise<Currency[]> {
    return this.prismaService.currency.findMany();
  }
}
