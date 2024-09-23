import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PrismaService } from '../services/prisma.service';
import { UsersService } from '../services/users.service';
import { CurrenciesService } from '../services/currencies.service';
import { CategoriesService } from '../services/categories.service';
import { ExpensesService } from '../services/expenses.service';
import { UsersController } from './users.controller';
import { CategoriesController } from './categories.controller';
import { CurrenciesController } from './currencies.controller';
import { ExpensesController } from './expenses.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      signOptions: {
        encoding: '8h',
      },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    CategoriesController,
    CurrenciesController,
    ExpensesController,
  ],
  providers: [
    PrismaService,
    AuthService,
    UsersService,
    CurrenciesService,
    CategoriesService,
    ExpensesService,
  ],
})
export class AppModule {}
