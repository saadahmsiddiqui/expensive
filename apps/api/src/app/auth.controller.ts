import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../interfaces/dto';
import { AuthService } from '../services/auth.service';

interface LoginDto {
  data: {
    email: string;
    password: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() requestBody: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = requestBody.data;
    const token = await this.authService.login(email, password);
    if (token === null)
      throw new HttpException('Invalid username or password', 400);

    return { accessToken: token };
  }

  @Post('register')
  async createUser(@Body() requestBody: CreateUserDto): Promise<User> {
    return this.authService.createUser(requestBody);
  }
}
