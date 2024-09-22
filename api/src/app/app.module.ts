import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PrismaService } from '../services/prisma.service';
import { UsersService } from '../services/users.service';
import { CurrenciesService } from '../services/currencies.service';
import { CategoriesService } from '../services/categories.service';
import { ExpensesService } from '../services/expenses.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    UsersService,
    CurrenciesService,
    CategoriesService,
    ExpensesService,
  ],
})
export class AppModule {}
