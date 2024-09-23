import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/:userId')
  async getUser(@Param() params: { userId: string }) {
    return this.usersService.getUser(params.userId);
  }
}
