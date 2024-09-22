import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../interfaces/dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.prismaService.user.create(user);
    return newUser;
  }

  async getUser(userId: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
