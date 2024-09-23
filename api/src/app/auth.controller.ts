import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../interfaces/dto';

interface LoginDto {
  data: {
    email: string;
    password: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() requestBody: LoginDto): Promise<boolean> {
    const { email, password } = requestBody.data;
    return this.usersService.authenticate(email, password);
  }

  @Post('register')
  async createUser(@Body() requestBody: CreateUserDto): Promise<User> {
    return this.usersService.createUser(requestBody);
  }
}
