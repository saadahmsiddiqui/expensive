import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

interface UserCreateDto {
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: UserCreateDto): Promise<User> {
    const newUser = await this.prismaService.user.create(user);
    return newUser;
  }

  async getUser(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
