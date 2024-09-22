import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../interfaces/dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('me/:userId')
  async getUser(@Param() params: { userId: string }) {
    return this.usersService.getUser(params.userId);
  }

  @Post('create')
  async createUser(@Body() requestBody: CreateUserDto): Promise<User> {
    return this.usersService.createUser(requestBody);
  }
}
