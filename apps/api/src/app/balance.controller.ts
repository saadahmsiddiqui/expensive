import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BalanceService } from '../services/balance.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthorizedRequest } from '../services/auth.service';
import { CurrencyBalance } from '../interfaces/balances';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) { }

  @UseGuards(AuthGuard)
  @Get('my')
  async createUser(
    @Req() req: AuthorizedRequest
  ): Promise<Array<CurrencyBalance>> {
    return this.balanceService.getCurrencyBalance(req.auth.userId);
  }
}
