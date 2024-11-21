import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Income } from '@prisma/client';
import { CreateIncomeDto } from '../interfaces/dto';

@Injectable()
export class IncomeService {
  constructor(private prismaService: PrismaService) {}

  async getIncome(userId: string): Promise<Income[]> {
    return this.prismaService.income.findMany({
      where: {
        createdBy: userId,
      },
      include: {
        Currency: true,
        Category: true,
      },
    });
  }

  async createIncome(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const newIncome = await this.prismaService.income.create(createIncomeDto);
    return newIncome;
  }
}
