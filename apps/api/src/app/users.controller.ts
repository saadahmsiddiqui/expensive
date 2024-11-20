import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthorizedRequest } from '../services/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getUser(@Req() request: AuthorizedRequest) {
    return this.usersService.getUser(request.auth.userId);
  }
}
