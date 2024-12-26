import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Records } from '@prisma/client';
import { CreateIncomeDto } from '../interfaces/dto';

@Injectable()
export class IncomeService {
  constructor(private prismaService: PrismaService) {}

  async getIncome(userId: string): Promise<Records[]> {
    return this.prismaService.records.findMany({
      where: {
        createdBy: userId,
        isDeleted: false,
        recordType: 'Income',
      },
      include: {
        Currency: true,
        Category: true,
      },
    });
  }

  async createIncome(createIncomeDto: CreateIncomeDto): Promise<Records> {
    const newIncome = await this.prismaService.records.create(createIncomeDto);
    return newIncome;
  }
}
